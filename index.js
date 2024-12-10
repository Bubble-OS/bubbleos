#!/usr/bin/env node

// Import non-built-in modules
const chalk = require("chalk");
const { question } = require("readline-sync");

// Import variable constants
const { GLOBAL_NAME, SHORT_NAME, VERSION, BUILD } = require("./src/variables/constants");

// Import private helper functions
const _intCmds = require("./src/functions/interpret");
const _detectArgs = require("./src/functions/detectArgs");

const Verbose = require("./src/classes/Verbose");

Verbose.custom("Detecting no timebomb argument...");
if (!_detectArgs("timebomb")) require("./src/functions/init/timebomb")();

Verbose.custom("Detecting no checks argument...");
if (_detectArgs("checks")) require("./src/functions/init/startupChecks")();

Verbose.custom("Detecting startup arguments help argument...");
if (_detectArgs("help")) {
  require("./src/functions/init/startupArgs")();

  Verbose.exitProcess();
  process.exit(0);
}

Verbose.custom("Detecting version argument...");
if (_detectArgs("version")) {
  Verbose.custom("Showing version information...");
  console.log(`${GLOBAL_NAME}, v${VERSION} (build ${BUILD})\n`);

  Verbose.exitProcess();
  process.exit(0);
}

Verbose.custom("Starting pre-boot interpreter...");
require("./src/functions/init/preBootInt")();

Verbose.custom("Initializing arguments...");
require("./src/functions/init/initArgs");

// Repeat forever until the user exits
(async () => {
  Verbose.custom("Completing elevation check...");
  await require("./src/functions/init/checkElevation")();

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
