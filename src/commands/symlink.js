// Get modules
const chalk = require("chalk");
const fs = require("fs");

// Get variables
const { GLOBAL_NAME } = require("../variables/constants");

// Get functions
const _convertAbsolute = require("../functions/convAbs");
const _replaceSpaces = require("../functions/replaceSpaces");
const _fatalError = require("../functions/fatalError");

// Get classes
const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");

/**
 * Either make a symbolic link or check if a path
 * is a symbolic link or not. This command is only
 * for use in the BubbleOS CLI shell.
 *
 * Usage:
 *
 * ```js
 * // (More arguments are accepted!)
 * symlink("target", "path"); // Makes a symlink
 * symlink("path", "-c"); // Checks if a path is a symlink
 * ```
 *
 * If you want to check if a path is a symbolic link,
 * you can add the `-c` flag to the end. This will check
 * if the file/directory is a symbolic link or not, and
 * will print the respective result.
 *
 * If you want to create a symbolic link, you must pass the
 * path parameter, as well as the target. This will create a
 * path (symbolic link) which points to the target
 * (not a symbolic link).
 *
 * Available arguments:
 * `-c`: Check if a path is a symbolic link.
 * `-s`: Only if you would like to create a symbolic
 * link. Silences all success messages, except for
 * error messages.
 *
 * @param {fs.PathLike | string} path The path that the symbolic link will point to (the target).
 * @param {fs.PathLike | string} newPath The symbolic link to create (the path). It can also be the `-c` argument.
 * @param  {...string} args Arguments to modify the behavior of the `symlink` function.
 */
const symlink = (path, newPath, ...args) => {
  try {
    // Initialize the 'check' argument as it defines whether or not to convert the new path to absolute
    const check =
      args.includes("-c") || args.includes("/c") || newPath === "-c" || newPath === "/c";

    // Replace spaces and then convert to an absolute path
    // Only if 'check' is false, convert the new path
    path = _convertAbsolute(_replaceSpaces(path));
    if (!check) newPath = _convertAbsolute(_replaceSpaces(newPath));

    // Initialize checks
    const pathChk = new Checks(path);
    const newPathChk = new Checks(newPath);

    // Initialize arguments
    const silent = args.includes("-s") || args.includes("/s");

    // Check if the path/new paths are not defined
    if (pathChk.paramUndefined() || newPathChk.paramUndefined()) {
      Errors.enterParameter("a path/the paths", "symlink path symbol");
      return;
    }

    // If the path does not exist...
    if (!pathChk.doesExist()) {
      Errors.doesNotExist("file/directory", path);
      return;
    }

    // If the user wanted to check if the path is a symbolic link
    if (check) {
      // If the path IS a symbolic link
      if (fs.lstatSync(path).isSymbolicLink())
        console.log(chalk.greenBright(`The path, ${chalk.bold(path)}, is a symbolic link.\n`));
      else
        console.log(chalk.hex("#FFA500")`The path, ${chalk.bold(path)}, is not a symbolic link.\n`);

      // Don't continue making a symbolic link; exit
      return;
    }

    // Make the symbolic link
    fs.symlinkSync(path, newPath);

    // If the user didn't want silence :)
    if (!silent)
      console.log(
        chalk.green(`Successfully linked ${chalk.bold(newPath)} to ${chalk.bold(path)}.\n`)
      );
    else console.log();
  } catch (err) {
    if (err.code === "EPERM") {
      // If there are no permissions to make the symbolic link
      // Note that on Windows (and maybe Linux/macOS), you need
      // to run it with elevated privileges to make the command
      // work, hence the tip.
      console.log(chalk.yellow(`Tip: Try running ${GLOBAL_NAME} with elevated privileges.`));

      Errors.noPermissions("make the symbolic link", newPath);
      return;
    } else {
      // Unknown error
      _fatalError(err);
    }
  }
};

// Export the function
module.exports = symlink;
