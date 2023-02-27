#!/usr/bin/env node

// Import non-built-in modules
const chalk = require("chalk");

// Import variable constants
const { GLOBAL_NAME, AUTHOR, VERSION, BUILD } = require("./src/variables/aboutConsts");

// Import private helper functions
const _mainArgs = require("./src/functions/mainArgs");
const _timebomb = require("./src/functions/timebomb");

// Import helper functions
const prompt = require("./src/prompt");
const _intCmds = require("./src/interpret");

// Get all of the arguments passed directly into BubbleOS
// For the pre-boot interpreter
const args = _mainArgs();

// Argument variables
let showTimebomb = true;
let showVersion = false;
let noWarnings = false;
global.noDump = false;

// Get all arguments and entered commands that were passed
if (args.length !== 0) {
  if (args.includes("--no-timebomb") || args.includes("--no-timebomb")) showTimebomb = false;
  if (
    args.includes("-v") ||
    args.includes("/v") ||
    args.includes("--version") ||
    args.includes("/version")
  )
    showVersion = true;
  if (args.includes("--no-warnings") || args.includes("/no-warnings")) noWarnings = true;
  if (args.includes("--no-dump") || args.includes("/no-dump")) global.noDump = true;
}

// If '--no-timebomb' wasn't in the arguments list, show the timebomb
if (showTimebomb) _timebomb();

// If '-v' was in the arguments list
if (showVersion) {
  console.log(chalk.bold(`${GLOBAL_NAME}, v${VERSION} (build ${BUILD})`));
  console.log(`Made by ${AUTHOR}!\n`);

  process.exit(0);
}

// If there are arguments, run the commands passed
if (args.length !== 0) {
  let command = args.filter((val) => {
    if (val.startsWith("/") || val.startsWith("-")) return false;
    return true;
  });

  if (command.length !== 0) {
    _intCmds(command.join(" "));
    process.exit(0);
  }
}

// Run the intro (only works if no commands have been entered in the pre-boot interpreter)
require("./src/intro");

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

// Repeat forever until the user exits
while (true) {
  // Ask the user for a command
  _intCmds(prompt());
}
