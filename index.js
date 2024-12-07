#!/usr/bin/env node

// Import non-built-in modules
const chalk = require("chalk");
const { question } = require("readline-sync");
const isElevated = require("is-elevated");

// Import variable constants
const {
  GLOBAL_NAME,
  SHORT_NAME,
  VERSION,
  BUILD,
  EXPIRY_DATE,
} = require("./src/variables/constants");

// Import private helper functions
const _timebomb = require("./src/functions/timebomb");
const _startupChecks = require("./src/functions/startupChecks");
const _intCmds = require("./src/functions/interpret");

const Verbose = require("./src/classes/Verbose");
const InfoMessages = require("./src/classes/InfoMessages");
const ConfigManager = require("./src/classes/ConfigManager");

// Get all of the arguments passed directly into BubbleOS
// For the pre-boot interpreter
const args = process.argv.splice(2);

// Argument variables
let showTimebomb = !args?.includes("--no-timebomb");
let doChecks = !args?.includes("--no-checks");
let showVersion = args?.includes("-v") || args?.includes("--version");
let noWarnings = args?.includes("--no-warnings");
let noIntro = args?.includes("--no-intro");
let resetConfig = args?.includes("--reset");

globalThis.verboseMode = args?.includes("--verbose");
globalThis.noDump = args?.includes("--no-dump");

Verbose.custom("Initialized arguments.");

// If '--no-timebomb' wasn't in the arguments list, show the timebomb
Verbose.custom("Completing timebomb check...");
if (showTimebomb) _timebomb();

Verbose.custom("Completing startup checks...");
if (doChecks) _startupChecks();

// If '-v' was in the arguments list
if (showVersion) {
  Verbose.custom("Detected -v argument, showing version...");
  console.log(`${GLOBAL_NAME}, v${VERSION} (build ${BUILD})\n`);
  process.exit(0);
}
Verbose.custom("Completed version argument check.");

// If there are arguments, run the commands passed
if (args.length !== 0) {
  Verbose.custom("Detecting if the pre-boot interpreter was invoked...");
  let command = args.filter((val) => {
    if (val.startsWith("-")) return false;
    return true;
  });

  if (command.length !== 0) {
    Verbose.custom("Running the command given to the pre-boot interpreter...")(async () => {
      await _intCmds(command.join(" "));
    })();

    return;
  }
}
Verbose.custom("Completed pre-boot interpreter command check.");

const config = new ConfigManager();

// Run the intro if requested (only works if no commands have been entered in the pre-boot interpreter)
Verbose.custom("Displaying intro...");
if (!noIntro) require("./src/intro");

Verbose.custom("Completing timebomb disabler check...");
if (!showTimebomb && !noWarnings && EXPIRY_DATE.getTime() < new Date().getTime())
  InfoMessages.warning(
    `The timebomb has been disabled. The timebomb is a security feature to prevent you from using outdated software. Please upgrade to a new version of ${GLOBAL_NAME} as soon as possible.`
  );

// TODO Remove this when verbose mode is fully implemented
if (globalThis.verboseMode)
  InfoMessages.info(
    "The verbose setting for BubbleOS will be introduced in the next build. It is currently unused."
  );

Verbose.custom("Completing fatal error file dump check...");
if (globalThis.noDump && !noWarnings)
  InfoMessages.warning("The fatal error file dump feature has been disabled.");

if (resetConfig) {
  if (config.deleteConfig()) {
    InfoMessages.success(`Successfully deleted the ${GLOBAL_NAME} configuration file.`);
  } else {
    InfoMessages.error(
      `An unexpected error occurred while trying to delete the ${GLOBAL_NAME} configuration file.`
    );
  }
}

const checkIfElevated = async () => {
  if ((await isElevated()) && !noWarnings)
    InfoMessages.warning(
      `${GLOBAL_NAME} is running with elevated privileges. Use commands with caution.`
    );
};

Verbose.custom("Creating configuration file...");
if (!config.createConfig()) {
  InfoMessages.error(
    `${GLOBAL_NAME} failed to create the configuration file. Some features will not work.`
  );
}

// Repeat forever until the user exits
(async () => {
  Verbose.custom("Completing elevation check...");
  await checkIfElevated();

  Verbose.custom("Starting command interpreter...");
  while (true) {
    // Ask the user for a command
    const command = question(
      `${chalk.bold.green(SHORT_NAME.toLowerCase())} ${chalk.blueBright(process.cwd())} ${chalk.red(
        "$"
      )} `
    );

    Verbose.custom("Interpreting command...");
    await _intCmds(command?.trim());
  }
})();
