// Get modules
const fs = require("fs");
const chalk = require("chalk");

// Get variables
const { GLOBAL_NAME } = require("../variables/constants");

// Get functions
const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");
const _promptForYN = require("../functions/promptForYN");
const _fatalError = require("../functions/fatalError");

// Get classes
const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");

/**
 * The maxmimum amount of characters before BubbleOS
 * asks the user to make sure that they want to read
 * the number of characters.
 */
const MAX_CHARS_CONFIRM = 5000;
/**
 * The maximum amount of characters that BubbleOS
 * can read.
 */
const MAX_CHARS_READ = 100_000;

/**
 * Read a file in the BubbleOS CLI shell synchronously.
 * This has a character limit, that can be bypassed
 * (dangerously; more information below).
 *
 * Usage:
 *
 * ```js
 * readfile("test.txt"); // Also accepts arguments!
 * ```
 *
 * BubbleOS has a limit on the number of characters
 * it can read (defined in `MAX_CHARS_READ`) and a
 * maxmimum number of characters before it confirms
 * that the user would like to read that many
 * characters (defined in `MAX_CHARS_CONFIRM`).
 * However, both can be bypassed using the `-y`
 * and `--ignore-max` flags for `MAX_CHARS_CONFIRM`
 * and `MAX_CHARS_READ`, respectively.
 *
 * Available arguments:
 * - `-y`: Bypass the confirmation of `MAX_CHARS_CONFIRM`.
 * - `--ignore-max`: Bypass the error of
 * `MAX_CHARS_READ`.
 *
 * @param {fs.PathLike | string} file The file that should be read. Both absolute and relative paths are accepted.
 * @param  {...string} args The arguments to modify the behaviour of `readfile`. Available arguments are above.
 */
const readfile = (file, ...args) => {
  try {
    // Replace spaces, then convert the file to an absolute path
    file = _convertAbsolute(_replaceSpaces(file));

    // Initialize checker
    const fileChk = new Checks(file);

    // Initialize arguments
    const confirm = !(args?.includes("-y") || args?.includes("/y"));
    const ignoreMax = args?.includes("--ignore-max") || args?.includes("/ignore-max");

    // If the file is not defined
    if (fileChk.paramUndefined()) {
      Errors.enterParameter("a file", "readfile test.txt");
      return;
    }

    if (!fileChk.doesExist()) {
      // The file does not exist
      Errors.doesNotExist("file", file);
      return;
    } else if (fileChk.validateType()) {
      // The file is a directory
      Errors.expectedFile(file);
      return;
    } else if (!fileChk.validEncoding()) {
      // The file is not plain text
      Errors.invalidEncoding("plain text");
      return;
    }

    // Get contents and number of characters
    const contents = fs.readFileSync(file, { encoding: "utf-8", flag: "r" });
    const chars = contents.length;

    // If the number of characters is greater than/equal to the maximum characters
    // that BubbleOS can read, and the user did not use the '--ignore-max' flag...
    if (chars >= MAX_CHARS_READ && !ignoreMax) {
      // ...tell the user that it is not possible to read that many characters
      console.log(
        chalk.yellow(
          `Too many characters to read (${chars} characters). ${GLOBAL_NAME} only supports reading less than ${MAX_CHARS_READ} characters.\nOperation cancelled.\n`
        )
      );
      return;
    } else if (chars >= MAX_CHARS_CONFIRM && confirm) {
      // If the characters is greater than/equal to the number of characters before BubbleOS
      // must confirm that the user wishes to read this many lines, unless they've alrady pre-accepted
      if (
        !_promptForYN(
          `The file, ${chalk.bold(
            file
          )}, has over ${MAX_CHARS_CONFIRM} characters (${chars} characters). Do you wish to continue?`
        )
      ) {
        // Anything BUT 'y' will cancel
        console.log(chalk.yellow("Operation cancelled.\n"));
        return;
      }

      // Newline
      console.log();
    }

    // Log the file contents
    console.log(fs.readFileSync(file, { encoding: "utf-8", flag: "r" }));

    // Log a newline
    console.log();
  } catch (err) {
    if (err.code === "EPERM") {
      // Invalid permissions to read the file
      Errors.noPermissions("read the file", file);
      return;
    } else if (err.code === "EBUSY") {
      // The file is in use
      Errors.inUse("file", file);
      return;
    } else {
      // Unknown error
      _fatalError(err);
    }
  }
};

// Export the functions
module.exports = readfile;
