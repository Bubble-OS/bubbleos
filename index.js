#!/usr/bin/env node

// Import non-built-in modules
const chalk = require("chalk");
const { question } = require("readline-sync");
const isElevated = require("is-elevated");

// Import variable constants
const { GLOBAL_NAME, SHORT_NAME, VERSION, BUILD } = require("./src/variables/constants");

// Import private helper functions
const _timebomb = require("./src/functions/timebomb");
const _startupChecks = require("./src/functions/startupChecks");
const _intCmds = require("./src/functions/interpret");
const _manageConfig = require("./src/functions/manageConfig");

// Get all of the arguments passed directly into BubbleOS
// For the pre-boot interpreter
const args = process.argv.splice(2);

// Argument variables
let showTimebomb = !args?.includes("--no-timebomb");
let doChecks = !args?.includes("--no-checks");
let showVersion = args?.includes("-v") || args?.includes("--version");
let noWarnings = args?.includes("--no-warnings");
let noIntro = args?.includes("--no-intro");
global.noDump = args?.includes("--no-dump");

// If '--no-timebomb' wasn't in the arguments list, show the timebomb
if (showTimebomb) _timebomb();

if (doChecks) _startupChecks();

// If '-v' was in the arguments list
if (showVersion) {
  console.log(`${GLOBAL_NAME}, v${VERSION} (build ${BUILD})\n`);
  process.exit(0);
}

// If there are arguments, run the commands passed
if (args.length !== 0) {
  let command = args.filter((val) => {
    if (val.startsWith("-")) return false;
    return true;
  });

  if (command.length !== 0) {
    (async () => {
      await _intCmds(command.join(" "));
    })();

    return;
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

if (!_manageConfig("create")) {
  console.log(
    chalk.red(
      `${chalk.bgRed.white(
        " DANGER: "
      )} ${GLOBAL_NAME} failed to create the configuration file. Some features will not work.\n`
    )
  );
}

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
