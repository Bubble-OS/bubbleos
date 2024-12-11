// Get packages
const chalk = require("chalk");
const fs = require("fs");

// Get functions
const _parseDoubleQuotes = require("../functions/parseQuotes");
const _convertAbsolute = require("../functions/convAbs");
const _promptForYN = require("../functions/promptForYN");
const _fatalError = require("../functions/fatalError");

// Get classes
const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");
const InfoMessages = require("../classes/InfoMessages");

/**
 * Delete a file/directory from BubbleOS. This is a CLI function.
 * Synchronously deletes a file/directory using the `fs.rmSync()`
 * function.
 *
 * Usage:
 *
 * ```js
 * del("test.txt"); // Arguments are supported
 * ```
 *
 * This command used to be in two separate commands/functions -
 * `rmdir` (removes a directory; empty or not) and `rmfile`
 * (removes a file). This command combines the two and can
 * delete all files, directories, and empty directories (so
 * you do not need to use a separate command to delete an empty
 * directory).
 *
 * Available arguments:
 * - `-s`: Silently delete the path that the user requested. This
 * means that the success message will not be shown, but error
 * messages will still be outputted.
 * - `-y`: Automatically accepts the confirmation prompt
 * before deleting a file.
 *
 * @param {fs.PathLike | string} path The relative or absolute path to the file/directory to delete.
 * @param {...string} args The arguments to modify the behavior of the `del` command. See all available arguments above.
 */
const del = (path, ...args) => {
  try {
    // Replace spaces and convert to an absolute path
    path = _convertAbsolute(_parseDoubleQuotes([path, ...args])[0]);

    // Initialize a path checker
    const pathChk = new Checks(path);

    // Initialize arguments
    const silent = args?.includes("-s");
    const confirmDel = !args?.includes("-y");

    // Check if the path is not defined
    if (pathChk.paramUndefined()) {
      Errors.enterParameter("a file/directory", "del test");
      return;
    }

    // If the path does not exist
    if (!pathChk.doesExist()) {
      Errors.doesNotExist("file/directory", path);
      return;
    }

    // If the user did not pass '-y', confirm that the path should be deleted
    if (confirmDel) {
      if (!_promptForYN(`Are you sure you want to permanently delete ${chalk.bold(path)}?`)) {
        // Anything BUT 'y' will cancel the deletion process
        console.log(chalk.yellow("Process aborted.\n"));
        return;
      }
    }

    // Delete the file/directory
    fs.rmSync(path, { recursive: true, force: true });

    // If the user wanted output, show the success message, else, only show a newline
    if (!silent) InfoMessages.success(`Successfully deleted ${chalk.bold(path)}.`);
    else console.log();

    return;
  } catch (err) {
    if (err.code === "EPERM") {
      // If the file/directory cannot be deleted by BubbleOS due to permission issues
      Errors.noPermissions("delete the file/directory", path);
    } else if (err.code === "EBUSY") {
      // If the file/directory is in use
      Errors.inUse("file/directory", path);
    } else {
      // Unknown error
      _fatalError(err);
    }
  }
};

// Export the function
module.exports = del;
