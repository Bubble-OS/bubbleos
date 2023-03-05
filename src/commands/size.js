// Get modules
const chalk = require("chalk");
const fs = require("fs");

// Get functions
const _replaceSpaces = require("../functions/replaceSpaces");
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
const _logSizes = (key, value) => {
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

const size = (file, sizes, ...args) => {
  try {
    // Replace spaces and convert it to an absolute path
    file = _convertAbsolute(_replaceSpaces(file));

    // Initialize checker
    const fileChk = new Checks(file);

    // If the file is not defined
    if (fileChk.paramUndefined()) {
      Errors.enterParameter("a file", "size test.txt");
      return;
    }

    // Sizes translations for the 'sizes' parameter
    const sizesTrans = {
      b: "Bytes",
      kb: "Kilobytes",
      mb: "Megabytes",
      gb: "Gigabytes",
      a: "All",
    };

    // If the 'sizes' is defined...
    if (!new Checks(sizes).paramUndefined()) {
      // Split it by commas
      sizes = sizes.split(",");

      // If the size the user requested is in the translation, leave it, else, delete it
      for (const val in sizesTrans) {
        if (!sizes.includes(val)) {
          delete sizesTrans[val];
        }
      }

      // If there are no more translations left
      if (Object.keys(sizesTrans).length === 0) {
        console.log(
          chalk.yellow(
            `No matches for the filter ${chalk.bold.italic(`'${sizes}'`)}.\nOperation cancelled.\n`
          )
        );
        return;
      }
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

    // If the sizes were passed in
    if (typeof sizes !== "undefined") {
      // If the user requested to see all ('a')
      if (typeof sizesTrans.a !== "undefined") {
        // Show all values
        for (const size in allSizes) {
          _logSizes(size, allSizes[size]);
        }
      } else {
        // Only show the values that the user requested
        for (const val in sizesTrans) {
          _logSizes(sizesTrans[val], allSizes[sizesTrans[val].toLowerCase()]);
        }
      }
    } else {
      // Show all of the values
      for (const size in allSizes) {
        _logSizes(size, allSizes[size]);
      }
    }

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
