// Get modules
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

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
const _logSize = (sizeType, sizeValue) => {
  const formattedSize = new Intl.NumberFormat("en-US").format(Number(sizeValue) ?? 0);

  if (sizeValue <= 0) return;

  // The value was not ≤0
  console.log(chalk.green(`${chalk.bold(formattedSize)} ${sizeType}`));
};

const _getDirectorySize = (dirPath) => {
  let totalSize = 0;
  const stack = [dirPath]; // Stack to track directories to process

  while (stack.length > 0) {
    const currentPath = stack.pop();
    const files = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const file of files) {
      const filePath = path.join(currentPath, file.name);

      if (file.isDirectory()) {
        // Push subdirectory onto the stack for later processing
        stack.push(filePath);
      } else if (file.isFile()) {
        // Add the size of the file
        totalSize += fs.statSync(filePath).size;
      }
    }
  }

  return totalSize;
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
 * @param {fs.PathLike | string} path The file/directory to find the sizes of.
 * @param  {...string} args The arguments to change the behavior of `size`.
 */
const size = (path, ...args) => {
  try {
    // Replace spaces and convert it to an absolute path
    path = _convertAbsolute(_parseDoubleQuotes([path, ...args])[0]);

    // Initialize checker
    const pathChk = new Checks(path);

    // If the file is not defined
    if (pathChk.paramUndefined()) {
      Errors.enterParameter("a file", "size test.txt");
      return;
    } else if (!pathChk.doesExist()) {
      // File doesn't exist
      Errors.doesNotExist("file/directory", file);
      return;
    }

    let totalSize = 0;
    if (pathChk.validateType()) {
      // Path is a directory
      totalSize = _getDirectorySize(path);
    } else {
      // Path is a file
      totalSize = fs.statSync(path).size;
    }

    // The size shortened to 2 decimal places
    const allSizes = _convertSize(totalSize, 2);

    // Priority order of size units
    const sizeLabels = ["GB", "MB", "KB", "bytes"];
    const sizeValues = [allSizes.gigabytes, allSizes.megabytes, allSizes.kilobytes, allSizes.bytes];

    console.log(`Size of ${path}:`);

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
    console.log(chalk.yellow(`${chalk.bold("0")} bytes`));

    console.log();
    return;
  } catch (err) {
    if (err.code === "EPERM") {
      // Invalid permissions to read the file
      Errors.noPermissions("calculate the size of the file/directory", path);
      return;
    } else if (err.code === "EBUSY") {
      // The file is in use
      Errors.inUse("file/directory", path);
      return;
    } else {
      // Unknown error
      _fatalError(err);
    }
  }
};

// Export the functions
module.exports = size;
