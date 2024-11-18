// Get modules
const chalk = require("chalk");
const fs = require("fs");

// Get functions
const _parseDoubleQuotes = require("../functions/parseQuotes");
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
 * Available arguments:
 * - `-s`: Silence all success messages to the standard output.
 *
 * @param {string} dir The directory to change into. Must be a valid directory.
 * @param  {...string} args The arguments that can be passed to modify the behavior of the command.
 */
const cd = (dir, ...args) => {
  try {
    // Parse double quotes
    dir = _parseDoubleQuotes([dir, ...args])[0];

    // Create a new directory checker
    const dirChk = new Checks(dir);

    // Initialize arguments
    const silent = args?.includes("-s");

    // Check if the parameter is undefined
    if (dirChk.paramUndefined()) {
      Errors.enterParameter("a directory", "cd test");
      return;
    }

    // Run checks
    if (!dirChk.doesExist()) {
      Errors.doesNotExist("directory", dir);
      return;
    }

    // If the path passed is a symbolic link or not
    const isSymlink = fs.lstatSync(dir).isSymbolicLink();

    if (isSymlink) {
      // If the path is a symbolic link, first get where it is pointing
      const symlinkPath = fs.readlinkSync(dir);

      // If the path it is pointing to is a file, throw an error
      if (!new Checks(symlinkPath).validateType()) {
        Errors.expectedDir(dir);
        return;
      }

      // Change the directory to the symbolic link pointing path
      process.chdir(symlinkPath);
    } else if (dirChk.validateType()) {
      // Normally change the directory
      process.chdir(dir);
    } else {
      // Path is a directory
      Errors.expectedDir(dir);
      return;
    }

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
