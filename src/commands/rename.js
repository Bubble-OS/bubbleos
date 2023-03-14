// Get modules
const chalk = require("chalk");
const fs = require("fs");

// Get functions
const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");
const _promptForYN = require("../functions/promptForYN");
const _fatalError = require("../functions/fatalError");

// Get classes
const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");

/**
 * Renames a file synchronously for use in the BubbleOS
 * shell. Therefore, this is a CLI tool.
 *
 * Usage:
 *
 * ```js
 * rename("hello.txt", "world.txt"); // Arguments are accepted!
 * ```
 *
 * Note that the old name and the new name cannot be
 * the same name. Also, if the new name already exists,
 * BubbleOS will confirm that the file should be
 * overwritten.
 *
 * Available arguments:
 * - `-y`: Automatically accept the overwriting prompt if the
 * new file already exists.
 * - `-s`: Silently rename the directory (don't output the
 * confirmation prompt). Error messages will still be shown.
 *
 * @param {fs.PathLike | string} oldName The old name of the file.
 * @param {fs.PathLike | string} newName The new name of the file.
 * @param  {...string} args Arguments to modify the behavior of `rename`. Available arguments are above.
 */
const rename = (oldName, newName, ...args) => {
  try {
    // Replace spaces and convert paths to absolute
    oldName = _convertAbsolute(_replaceSpaces(oldName));
    newName = _convertAbsolute(_replaceSpaces(newName));

    // Initialize checks
    const oldChk = new Checks(oldName);
    const newChk = new Checks(newName);

    // Initialize commands
    const confirm = !(args?.includes("-y") || args?.includes("/y"));
    const silent = args?.includes("-s") || args?.includes("/s");

    // If either of the parameters aren't defined
    if (oldChk.paramUndefined() || newChk.paramUndefined()) {
      Errors.enterParameter("the old name and the new name", "rename old.txt new.txt");
      return;
    }

    // If the names are the same
    if (oldName === newName) {
      console.log(chalk.yellow("The old and new names cannot be the same.\nProcess aborted.\n"));
      return;
    }

    // If the path does not exist (current path)
    if (!oldChk.doesExist()) {
      Errors.doesNotExist("file", oldName);
      return;
    }

    // If the path exists and the user didn't add the '-y' flag
    if (confirm && newChk.doesExist()) {
      // If the user doesn't enter 'y'
      if (
        !_promptForYN(
          `The file/directory, ${chalk.bold(
            newName
          )} exists and will be overwritten. Do you want to continue?`
        )
      ) {
        console.log(chalk.yellow("Process aborted.\n"));
        return;
      }
    }

    // Rename
    fs.renameSync(oldName, newName);

    // If the user did not want output, only show a newline, else, show the success message
    if (!silent)
      console.log(
        chalk.green(`Successfully renamed ${chalk.bold(oldName)} to ${chalk.bold(newName)}.\n`)
      );
    else console.log();
  } catch (err) {
    if (err.code === "EPERM") {
      // Permission error
      Errors.noPermissions("rename the file/directory", `${oldName}/${newName}`);
      return;
    } else if (err.code === "EBUSY") {
      // In use error
      Errors.inUse("file/directory", `${oldName}/${newName}`);
      return;
    } else if (err.code === "ENAMETOOLONG") {
      // The name is too long
      // This code only seems to appear on Linux and macOS
      // On Windows, the code is 'EINVAL'
      Errors.pathTooLong(newName);
      return;
    } else if (err.code === "EINVAL") {
      // Invalid characters; basically just goes for Windows
      // NTFS' file system character limitations
      // However, Windows also uses this code when the file
      // path exceeds 260 characters, or when the file name
      // exceeds 255 characters
      Errors.invalidCharacters(
        "directory name",
        "valid path characters",
        "characters such as '?' or ':' (Windows only)",
        newName
      );
      return;
    } else {
      // Unknown error
      _fatalError(err);
    }
  }
};

// Export the function
module.exports = rename;
