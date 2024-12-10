// Get modules
const chalk = require("chalk");
const fs = require("fs");

// Get functions
const _parseDoubleQuotes = require("../functions/parseQuotes");
const _convertAbsolute = require("../functions/convAbs");
const _fatalError = require("../functions/fatalError");

// Get checks
const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");
const _promptForYN = require("../functions/promptForYN");
const path = require("path");

/**
 * Make a directory synchronously. This is meant
 * to be used in the BubbleOS CLI shell, and not
 * during normal coding operations.
 *
 * Usage:
 *
 * ```js
 * // Arguments are also accepted!
 * mkdir("hello"); // Only makes the 'hello' directory
 * mkdir("hello/world"); // Makes both the 'hello' and 'world' directory inside
 * ```
 *
 * This command uses the `recursive` option, which
 * means that in the case of a parent directory
 * not being defined, BubbleOS will automatically
 * create it. The function being used to create the
 * directories is `fs.mkdirSync()`.
 *
 * Note that there is a small hiccup in the error
 * codes, where if the path/file names are too long,
 * Linux and macOS will show the error code correctly
 * as `ENAMETOOLONG`, but Windows will show it as
 * `EINVAL`.
 *
 * Available arguments:
 * - `-s`: Silence all outputs to the standard output,
 * which includes the success message. Only error
 * messages are shown.
 *
 * @param {fs.PathLike | string} dir The directory/directories that should be created. Both absolute and relative directories are accepted.
 * @param  {...string} args Arguments to change the behavior of `mkdir()`. Available arguments are listed above.
 */
const mkdir = (dir, ...args) => {
  try {
    // Replace spaces in the directory, and then convert it to an absolute path
    dir = _convertAbsolute(_parseDoubleQuotes([dir, ...args])[0]);

    // Initialize checker
    const dirChk = new Checks(dir);

    // Initialize arguments
    const silent = args?.includes("-s");

    // If the directory is not defined
    if (dirChk.paramUndefined()) {
      Errors.enterParameter("a directory", "mkdir test");
      return;
    }

    // If the directory already exists
    if (dirChk.doesExist()) {
      if (
        _promptForYN(
          `The directory, '${chalk.italic(
            path.basename(dir)
          )}', already exists. Would you like to delete it?`
        )
      ) {
        try {
          fs.rmSync(dir, { recursive: true, force: true });
          console.log(chalk.green(`Successfully deleted ${chalk.bold(dir)}.\n`));
        } catch {
          if (err.code === "EPERM") {
            Errors.noPermissions("delete the directory", dir);
          } else if (err.code === "EBUSY") {
            Errors.inUse("directory", dir);
          }

          return;
        }
      } else {
        console.log(chalk.yellow("Process aborted.\n"));
        return;
      }
    }

    // Make the directory
    // The recursive option makes all parent directories
    // in the case that they don't exist
    fs.mkdirSync(dir, { recursive: true });

    // If the user didn't request for silence, show the success message, else, show a newline
    if (!silent) console.log(chalk.green(`Successfully made the directory ${chalk.bold(dir)}.\n`));
    else console.log();
  } catch (err) {
    if (err.code === "ENOENT") {
      // In the case that the recursive option is disabled,
      // throw an error if a parent directory does not exist
      Errors.doesNotExist("directory", dir);
      return;
    } else if (err.code === "EPERM") {
      // Invalid permissions to create the directory
      Errors.noPermissions("create the directory", dir);
      return;
    } else if (err.code === "ENAMETOOLONG") {
      // The name is too long
      // This code only seems to appear on Linux and macOS
      // On Windows, the code is 'EINVAL'
      Errors.pathTooLong(dir);
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
        dir
      );
      return;
    } else {
      // Unknown error
      _fatalError(err);
    }
  }
};

// Export the function
module.exports = mkdir;
