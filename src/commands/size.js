const chalk = require("chalk");

const _parseDoubleQuotes = require("../functions/parseQuotes");
const _convertAbsolute = require("../functions/convAbs");
const _caseSensitivePath = require("../functions/caseSensitivePath");
const _convertSize = require("../functions/convSize");
const _fatalError = require("../functions/fatalError");
const _getSize = require("../functions/getSize");

const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");
const Verbose = require("../classes/Verbose");

/**
 * A function to log the sizes that
 * were given, and also making the keys
 * user-friendly by capitalizing the first letter.
 *
 * @param {string} key The key, which is the name of the type of size.
 * @param {number | string} value The value of the type of size in `key`.
 */
const _logSize = (sizeType, sizeValue) => {
  Verbose.custom("Formatting size...");
  const formattedSize = new Intl.NumberFormat("en-US").format(Number(sizeValue) ?? 0);

  if (sizeValue <= 0) return;

  // The value was not ≤0
  Verbose.custom("Logging size...");
  console.log(chalk.green(`${chalk.bold(formattedSize)} ${sizeType}`));
};

/**
 * Show the size of a file from the BubbleOS CLI.
 *
 * @param {string} path The file/directory to find the sizes of.
 * @param {...string} args The arguments to change the behavior of `size`.
 */
const size = (path, ...args) => {
  try {
    // Converts path to an absolute path and corrects
    // casing on Windows, and resolves spaces
    path = _caseSensitivePath(_convertAbsolute(_parseDoubleQuotes([path, ...args])[0]));

    Verbose.initChecker();
    const pathChk = new Checks(path);

    if (pathChk.paramUndefined()) {
      Verbose.chkEmpty();
      Errors.enterParameter("a file", "size test.txt");
      return;
    } else if (!pathChk.doesExist()) {
      Verbose.chkExists();
      Errors.doesNotExist("file/directory", file);
      return;
    } else if (pathChk.pathUNC()) {
      Verbose.chkUNC();
      Errors.invalidUNCPath();
      return;
    }

    Verbose.custom("Calculating size...");
    const totalSize = _getSize(path, pathChk.validateType() ? "directory" : "file");

    // The size shortened to 2 decimal places
    Verbose.custom("Converting size and shortening...");
    const allSizes = _convertSize(totalSize, 2);

    // Priority order of size units
    const sizeLabels = ["GB", "MB", "KB", "bytes"];
    const sizeValues = [allSizes.gigabytes, allSizes.megabytes, allSizes.kilobytes, allSizes.bytes];

    console.log(`Size of ${path}:`);

    Verbose.custom("Finding best unit of measurement to use...");
    for (let i = 0; i < sizeValues.length; i++) {
      if (sizeValues[i] > 0) {
        // Adjust "bytes" to singular if the size is 1
        const label = sizeLabels[i] === "bytes" && sizeValues[i] === 1 ? "byte" : sizeLabels[i];
        _logSize(label, sizeValues[i]);

        console.log();
        return;
      }
    }

    // If no meaningful size is found (totalSize is 0)
    Verbose.custom("Filesize is 0 bytes, logging...");
    console.log(chalk.yellow(`${chalk.bold("0")} bytes\n`));
  } catch (err) {
    if (err.code === "EPERM") {
      Verbose.permError();
      Errors.noPermissions("calculate the size of the file/directory", path);
      return;
    } else if (err.code === "EBUSY") {
      Verbose.inUseError();
      Errors.inUse("file/directory", path);
      return;
    } else {
      Verbose.fatalError();
      _fatalError(err);
    }
  }
};

module.exports = size;
