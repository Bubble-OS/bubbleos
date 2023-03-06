// Get modules
const chalk = require("chalk");

// Get functions
const _replaceSpaces = require("../functions/replaceSpaces");
const _fatalError = require("../functions/fatalError");

// Get classes
const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");

/**
 * Change into a directory (command usage only).
 *
 * Usage:
 *
 * ```js
 * cd("test", "-s"); // '-s' is an argument and is optional
 * ```
 *
 * Note that changing a directory in BubbleOS does not reflect
 * across the OS. For example, running BubbleOS in `C:\Users`,
 * then changing into `Test` in BubbleOS, then exiting, would
 * still have the directory as `C:\Users` instead of `C:\Users\Test`.
 *
 * @param {string} dir The directory to change into. Must be a valid directory.
 * @param  {...string} args The arguments that can be passed to modify the behaviour of the command.
 */
const cd = (dir, ...args) => {
  try {
    // Replace spaces
    dir = _replaceSpaces(dir);

    // Create a new directory checker
    const dirChk = new Checks(dir);

    // Intialize arguments
    const silent = args?.includes("-s") || args?.includes("/s");

    // Check if the parameter is undefined
    if (dirChk.paramUndefined()) {
      Errors.enterParameter("a directory", "cd test");
      return;
    }

    // Run checks
    if (!dirChk.doesExist()) {
      Errors.doesNotExist("directory", dir);
      return;
    } else if (!dirChk.validateType()) {
      Errors.expectedDir(dir);
      return;
    }

    // Change directory
    process.chdir(dir);

    if (!silent)
      console.log(chalk.green(`Successfully changed the directory to ${chalk.bold(dir)}.\n`));
    else console.log();
  } catch (err) {
    if (err.code === "EPERM") {
      // Permission error
      Errors.noPermissions("change into", dir);
      return;
    } else {
      // Unknown error
      _fatalError(err);
    }
  }
};

// Export the function
module.exports = cd;
