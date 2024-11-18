// Get modules
const chalk = require("chalk");
const fs = require("fs");

// Get functions
const _parseDoubleQuotes = require("../functions/parseQuotes");
const _convertAbsolute = require("../functions/convAbs");
const _convertSize = require("../functions/convSize");
const _fatalError = require("../functions/fatalError");

// Get classes
const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");

/**
 * A **private** function to log the sizes that
 * were given, and also making the keys
 * user-friendly by capitalizing the first letter.
 *
 * @param {string} key The key, which is the name of the type of size.
 * @param {number | string} value The value of the type of size in `key`.
 */
const _logSize = (key, value) => {
  // Capitalize the first letter of the word
  const showSize = key.charAt(0).toUpperCase() + key.slice(1);

  if (value <= 0) {
    // If the value passed was '0' or less than that
    console.log(`${showSize}: ${chalk.bold.red.dim("N/A")}`);
  } else {
    // The value was not ≤0
    console.log(`${showSize}: ${chalk.bold.redBright(value)}`);
  }
};

/**
 * Show the size of a file from the BubbleOS CLI.
 * This is only meant to be used inside of the
 * BubbleOS shell and should not be used elsewhere.
 *
 * Usage:
 *
 * ```js
 * size("test.txt"); // Arguments accepted!
 * ```
 *
 * Note that getting the size of a directory is not
 * yet supported, however, this is to be added in
 * BubbleOS build 200.
 *
 * Available arguments:
 * - `-b`: Get the bytes of a file only.
 * - `-kb`: Get the megabytes of a file only.
 * - `-mb`: Get the kilobytes of a file only.
 * - `-gb`: Get the gigabytes of a file only.
 *
 * @param {fs.PathLike | string} file The file to find the sizes of.
 * @param  {...string} args The arguments to change the behavior of `size`.
 */
const size = (file, ...args) => {
  try {
    // Replace spaces and convert it to an absolute path
    file = _convertAbsolute(_parseDoubleQuotes([path, ...args])[0]);

    // Initialize checker
    const fileChk = new Checks(file);

    // Initialize arguments
    // Sizes
    const bytes = args?.includes("-b");
    const kilobytes = args?.includes("-kb");
    const megabytes = args?.includes("-mb");
    const gigabytes = args?.includes("-gb");

    // If no arguments were passed, show all
    const all = !bytes && !kilobytes && !megabytes && !gigabytes;

    // If the file is not defined
    if (fileChk.paramUndefined()) {
      Errors.enterParameter("a file", "size test.txt");
      return;
    }

    if (!fileChk.doesExist()) {
      // File doesn't exist
      Errors.doesNotExist("file", file);
      return;
    } else if (fileChk.validateType()) {
      // Path is a directory
      Errors.expectedFile(file);
      return;
    }

    // The size shortened to 4 decimal places
    const allSizes = _convertSize(fs.statSync(file).size, 4);

    // Log all sizes depending on what sizes the user requested
    if (bytes || all) _logSize("Bytes", allSizes.bytes);
    if (kilobytes || all) _logSize("Kilobytes", allSizes.kilobytes);
    if (megabytes || all) _logSize("Megabytes", allSizes.megabytes);
    if (gigabytes || all) _logSize("Gigabytes", allSizes.gigabytes);

    // Newline and return
    console.log();
    return;
  } catch (err) {
    if (err.code === "EPERM") {
      // Invalid permissions to read the file
      Errors.noPermissions("calculate the size of the file", file);
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
module.exports = size;
