// Get modules
const chalk = require("chalk");
const fs = require("fs");

// Get functions
const _parseDoubleQuotes = require("../functions/parseQuotes");
const _fatalError = require("../functions/fatalError");

// Get classes
const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");
const Verbose = require("../classes/Verbose");
const InfoMessages = require("../classes/InfoMessages");

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
    Verbose.parseQuotes();
    dir = _parseDoubleQuotes([dir, ...args])[0];

    // Create a new directory checker
    Verbose.initChecker();
    const dirChk = new Checks(dir);

    // Initialize arguments
    Verbose.initArgs();
    const silent = args?.includes("-s");

    // Check if the parameter is undefined
    if (dirChk.paramUndefined()) {
      Verbose.chkEmpty();
      Errors.enterParameter("a directory", "cd test");
      return;
    }

    // Run checks
    if (!dirChk.doesExist()) {
      Verbose.chkExists(dir);
      Errors.doesNotExist("directory", dir);
      return;
    }

    // If the path passed is a symbolic link or not
    Verbose.custom("Checking if path is a symbolic link...");
    const isSymlink = fs.lstatSync(dir).isSymbolicLink();

    if (isSymlink) {
      // If the path is a symbolic link, first get where it is pointing
      Verbose.custom("Path is a symbolic link; finding where it is pointing to...");
      const symlinkPath = fs.readlinkSync(dir);

      // If the path it is pointing to is a file, throw an error
      if (!new Checks(symlinkPath).validateType()) {
        Verbose.custom("Symbolic link points to a file.");
        Errors.expectedDir(dir);
        return;
      }

      // Change the directory to the symbolic link pointing path
      Verbose.custom(
        `Changing directory to the specified destination '${chalk.italic(
          symlinkPath
        )}' (symbolic link)...`
      );
      process.chdir(symlinkPath);
    } else if (dirChk.validateType()) {
      // Normally change the directory
      Verbose.custom(
        `Path is not a symbolic link, changing directory to the specified destination '${chalk.italic(
          dir
        )}'...`
      );
      process.chdir(dir);
    } else {
      // Path is a file
      // _verboseMsg("Path was found to be a file instead of a directory.");
      Errors.expectedDir(dir);
      return;
    }

    if (!silent) InfoMessages.success(`Successfully changed the directory to ${chalk.bold(dir)}.`);
    else console.log();
  } catch (err) {
    if (err.code === "EPERM") {
      // Permission error
      Verbose.permError();
      Errors.noPermissions("change into", dir);
      return;
    } else {
      Verbose.fatalError();
      _fatalError(err);
    }
  }
};

// Export the function
module.exports = cd;
