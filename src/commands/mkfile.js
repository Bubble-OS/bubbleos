// Get modules
const fs = require("fs");
const chalk = require("chalk");
const { question } = require("readline-sync");

// Get functions
const _parseDoubleQuotes = require("../functions/parseQuotes");
const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");
const _fatalError = require("../functions/fatalError");

// Get classes
const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");

/**
 * Make a file synchronously using `fs.mkfileSync()`.
 * This is a CLI tool for use with the BubbleOS
 * shell.
 *
 * Usage:
 *
 * ```js
 * mkfile("test.txt"); // Arguments accepted!
 * ```
 *
 * If a parent directory does not exist, this command
 * will not work.
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
 * @param {fs.PathLike | string} file The file that should be created. Both absolute and relative paths are accepted.
 * @param  {...string} args Arguments to change the behavior of `mkfile()`. Available arguments are listed above.
 */
const mkfile = (file, ...args) => {
  try {
    // Replace spaces and then convert the file to an absolute path
    file = _convertAbsolute(_parseDoubleQuotes([file, ...args])[0]);

    // Initialize checker
    const fileChk = new Checks(file);

    // Initialize arguments
    const silent = args?.includes("-s") || args?.includes("/s");

    // If the file was not defined
    if (fileChk.paramUndefined()) {
      Errors.enterParameter("a file", "mkfile test.txt");
      return;
    }

    // If the file already exists
    if (fileChk.doesExist()) {
      Errors.alreadyExists("file", file);
      return;
    }

    // Prompt the user for file contents
    // Replace '*n' with newlines
    const contents =
      _replaceSpaces(
        question(
          `Please enter the file contents (${chalk.italic("'Enter'")} to accept; ${chalk.italic(
            "'*n'"
          )} for a newline; leave blank to make an empty file): `
        ),
        "*n",
        "\n"
      ) ?? "";

    // Make the file
    fs.writeFileSync(file, contents);

    // If the user requested output, show a success message, else, show a newline
    if (!silent) console.log(chalk.green(`Successfully made the file ${chalk.bold(file)}.\n`));
    else console.log();
  } catch (err) {
    if (err.code === "ENOENT") {
      // If the parent directory does not exist
      Errors.doesNotExist("file", file);
      return;
    } else if (err.code === "EPERM") {
      // No permissions to make the file
      Errors.noPermissions("make the file", file);
      return;
    } else if (err.code === "ENAMETOOLONG") {
      // Name too long
      // This code only seems to appear on Linux and macOS
      // On Windows, the code is 'EINVAL'
      Errors.pathTooLong(file);
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
module.exports = mkfile;
