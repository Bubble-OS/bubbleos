// Color the terminal and check to make sure that the file is plain text
const chalk = require("chalk");
const { isText } = require("istextorbinary");

// Node.js built-in file system module
const fs = require("fs");
const path = require("path");

// Custom-made functions
const _errorInterpret = require("../functions/errorInt");
const _convertAbsolute = require("../functions/convAbs");
const _fatalError = require("../functions/fatalError");

/**
 * Find a word or phrase in a file.
 *
 * Usage (code):
 * ```js
 * fif("test.txt", "hello");
 * ```
 *
 * Usage (terminal):
 * ```
 * $ fif text.txt world
 * ```
 *
 * @param {string} file A path to the file to search in. Please note directories are not valid.
 * @param {string} toFind The word or phrase to find
 */
const fif = (file, toFind) => {
  // Check to make sure the file/phrase to find is not empty
  if (typeof file === "undefined" || typeof toFind === "undefined") {
    _errorInterpret("0x0060");
    return;
  }

  // Convert the path to absolute
  const fileName = _convertAbsolute(file);

  // Make sure the file exists
  if (!fs.existsSync(fileName)) {
    _errorInterpret("0x0061", { variable: fileName });
    return;
  }

  try {
    if (fs.lstatSync(fileName).isDirectory()) {
      _errorInterpret("0x0065", { variable: fileName });
      return;
    }

    // Make sure the file IS a text file
    if (!isText(fileName, fs.readFileSync(fileName, { flag: "r" }))) {
      _errorInterpret("0x0062");
      return;
    }

    // Just to clean it up :)
    const contents = fs.readFileSync(fileName, { encoding: "utf-8", flag: "r" });

    // You gotta be careful with this
    // The brackets seem to confuse a few ??

    // Log the number of occurances
    console.log(
      `Number of occurances: ${chalk.bold.green(
        (contents.match(new RegExp(toFind, "ig")) || []).length
      )}\n`
    );

    // TODO Add highlighted appearance
    // The issue is that String.replaceAll doesn't seem to be helping
    // Even when paired with Chalk
    // For loops will not help
  } catch (err) {
    if (err.code === "EISDIR") {
      // If the path is a directory
      _errorInterpret("0x0065", { variable: fileName });
    } else {
      // Another error
      _fatalError(err);
    }
  }
};

module.exports = fif;
