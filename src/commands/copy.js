// Get packages
const chalk = require("chalk");

const fs = require("fs");

// Get functions
const _convertAbsolute = require("../functions/convAbs");
const _parseDoubleQuotes = require("../functions/parseQuotes");
const _promptForYN = require("../functions/promptForYN");
const _fatalError = require("../functions/fatalError");

// Get classes
const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");

/**
 * Synchronously copy a directory from the source (`src`)
 * to the destination (`dest`). This is a BubbleOS command
 * function for the command `copy` (which used to be
 * `copydir` and `copyfile` before it was combined).
 *
 * Usage:
 *
 * ```js
 * copy("src", "dest"); // Arguments are accepted, which are listed below
 * ```
 *
 * There is a bug in this command where it can throw an error
 * when copying a file to another file, and that file already exists.
 * It does not happen everywhere, and is extremely hard to recreate,
 * so it should not be an issue for build 100. But, the issue is that
 * sometimes, when attempting to copy a file to another directory which
 * has a file with the same name as the source, an error will occur (with
 * a technical error code of `ERR_FS_CP_DIR_TO_NON_DIR`). This (for me) makes
 * no sense, but it occurs in the `fs.cpSync()` function, so the check for the
 * directory results in it thinking that the source is a destination, when
 * really, it is a file. This should be fixed hopefully soon, but as said
 * before, it is very hard to recreate, so users should not face this issue
 * that often.
 *
 * Available arguments:
 * - `-s`: Silently copy the source to the destination and silence all success
 * messages to the standard output. Only errors can be logged.
 * - `-y`: Copy the file/directory to the destination even if it already exists
 * and is in danger of being overwritten.
 * - `-t`: **Only for directory copying!** Keeps the timestamps of all files and
 * directories to their last modified date, instead of modifying it when the directory
 * has been copied.
 * - `--rm-symlink`: **Only for directory copying!** If a symbolic link exists in
 * the directory, this flag will remove it and replace it with a copy of the actual
 * contents of the file/directory it was pointing to.
 *
 * @param {fs.PathLike | string} src The source file/directory that should be copied.
 * @param {fs.PathLike | string} dest The destination that the source should be copied to.
 * @param  {...string} args Arguments to modify the behavior of `copy()`. The available arguments are listed above.
 * @returns
 */
const copy = (src, dest, ...args) => {
  try {
    // Replace spaces and then convert the path to an absolute one to both the source and destination paths
    [src, dest] = _parseDoubleQuotes([src, dest, ...args]);
    [src, dest] = [_convertAbsolute(src), _convertAbsolute(dest)];

    // Initialize checkers
    const srcChk = new Checks(src);
    const destChk = new Checks(dest);

    // Initialize arguments
    const silent = args?.includes("-s") || args?.includes("/s");
    const confirmCopy = !(args.includes("-y") || args.includes("/y"));
    const keepTimes = args?.includes("-t") || args?.includes("/t");
    const rmSymlinkReference = args?.includes("--rm-symlink") || args?.includes("/rm-symlink");

    // If EITHER the source or destinations are not defined
    if (srcChk.paramUndefined() || destChk.paramUndefined()) {
      Errors.enterParameter("the source/destination", "copy src dest");
      return;
    }

    // If the source path does not exist
    if (!srcChk.doesExist()) {
      Errors.doesNotExist("source", src);
      return;
    }

    // If there was no '-y' argument and the destination exists
    if (confirmCopy && destChk.doesExist()) {
      // If the user doesn't enter 'y'
      if (
        !_promptForYN(
          `The file/directory, ${chalk.bold(
            dest
          )} exists and will be overwritten. Do you want to continue?`
        )
      ) {
        console.log(chalk.yellow("Process aborted.\n"));
        return;
      }

      console.log();
    }

    // Only show the waiting message if the silent flag was not provided
    if (!silent) console.log(chalk.italic.blueBright("Please wait; this may take a while..."));

    if (srcChk.validateType()) {
      // If the path is a directory

      // TODO there is an error where ERR_FS_CP_DIR_TO_NON_DIR
      // will appear even if the paths are files. Fix it pls!
      fs.cpSync(src, dest, {
        recursive: true,
        dereference: rmSymlinkReference,
        preserveTimestamps: keepTimes,
      });
    } else {
      // If the path is a file
      fs.copyFileSync(src, dest);
    }

    // If the user did not want output, only show a newline, else, show the success message
    if (!silent)
      console.log(
        chalk.green(`Successfully copied to ${chalk.bold(src)} to ${chalk.bold(dest)}.\n`)
      );
    else console.log();
  } catch (err) {
    if (err.code === "EPERM") {
      // Invalid permissions for either the source or destination
      Errors.noPermissions("copy", src);
      return;
    } else if (err.code === "EBUSY") {
      // Files/directories are in use for either the source or destination
      Errors.inUse("file/directory", `${src} and/or ${dest}`);
      return;
    } else if (err.code === "EISDIR") {
      // If the user attempted to copy a file to a directory
      Errors.expectedFile(dest);
      return;
    } else if (err.code === "ENOTDIR") {
      // If the user attempted to copy a directory to a file
      Errors.expectedDir(dest);
      return;
    } else if (err.code === "ERR_FS_CP_DIR_TO_NON_DIR") {
      // If the user attempted to copy a directory to a non-directory

      // There is also a bug in BubbleOS which can do the same thing.
      // IDK, it seems kind of random to me; it only happened once in
      // my testing, even without changing the code. It seems to happen
      // in fs.cpSync(). Fix it please!
      Errors.dirToNonDir();
    } else {
      // An unknown error occurred
      _fatalError(err);
    }
  }
};

// Export the function
module.exports = copy;
