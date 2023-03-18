#!/usr/bin/env node

// Import non-built-in modules
const chalk = require("chalk");
const { question } = require("readline-sync");
const isElevated = require("is-elevated");

// Import variable constants
const { GLOBAL_NAME, SHORT_NAME, AUTHOR, VERSION, BUILD } = require("./src/variables/constants");

// Import private helper functions
const _timebomb = require("./src/functions/timebomb");
const _startupChecks = require("./src/functions/startupChecks");
const _intCmds = require("./src/functions/interpret");
const _fatalError = require("./src/functions/fatalError");

process.on("uncaughtException", (err) => {
  _fatalError(err, false);
});

// Get all of the arguments passed directly into BubbleOS
// For the pre-boot interpreter
const args = process.argv.splice(2);

// Argument variables
let showTimebomb = true;
let doChecks = true;
let showVersion = false;
let noWarnings = false;
let noIntro = false;
global.noDump = false;

// Get all arguments and entered commands that were passed
if (args.length !== 0) {
  if (args.includes("--no-timebomb") || args.includes("--no-timebomb")) showTimebomb = false;
  if (args.includes("--no-checks") || args.includes("--no-checks")) doChecks = false;
  if (
    args.includes("-v") ||
    args.includes("/v") ||
    args.includes("--version") ||
    args.includes("/version")
  )
    showVersion = true;
  if (args.includes("--no-warnings") || args.includes("/no-warnings")) noWarnings = true;
  if (args.includes("--no-intro") || args.includes("/no-intro")) noIntro = true;
  if (args.includes("--no-dump") || args.includes("/no-dump")) global.noDump = true;
}

// If '--no-timebomb' wasn't in the arguments list, show the timebomb
if (showTimebomb) _timebomb();

if (doChecks) _startupChecks();

// If '-v' was in the arguments list
if (showVersion) {
  console.log(`v${VERSION} (build ${BUILD})\n`);

  process.exit(0);
}

// If there are arguments, run the commands passed
if (args.length !== 0) {
  let command = args.filter((val) => {
    if (val.startsWith("/") || val.startsWith("-")) return false;
    return true;
  });

  if (command.length !== 0) {
    (async () => {
      await _intCmds(command.join(" "));
    })();
    process.exit(0);
  }
}

// Run the intro if requested (only works if no commands have been entered in the pre-boot interpreter)
if (!noIntro) require("./src/intro");

if (!showTimebomb && !noWarnings) {
  console.log(
    chalk.yellow(
      `${chalk.bgYellow.black(
        " WARNING: "
      )} The timebomb has been disabled. The timebomb is a security feature to prevent you from using outdated software. Please upgrade to a new version of ${GLOBAL_NAME} as soon as possible.\n`
    )
  );
}
if (global.noDump && !noWarnings) {
  console.log(
    chalk.yellow(
      `${chalk.bgYellow.black(" WARNING: ")} The fatal error file dump feature has been disabled.\n`
    )
  );
}

const checkIfElevated = async () => {
  if ((await isElevated()) && !noWarnings) {
    console.log(
      chalk.yellow(
        `${chalk.bgYellow.black(
          " WARNING: "
        )} ${GLOBAL_NAME} is running with elevated privileges. Use commands with caution.\n`
      )
    );
  }
};

// Repeat forever until the user exits
(async () => {
  await checkIfElevated();

  while (true) {
    // Ask the user for a command
    const command = question(
      `${chalk.bold.green(SHORT_NAME.toLowerCase())} ${chalk.blueBright(process.cwd())} ${chalk.red(
        "$"
      )} `
    );

    await _intCmds(command?.trim());
  }
})();
