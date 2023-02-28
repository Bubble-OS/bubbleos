// Color the terminal and check to make sure that the file is plain text
const chalk = require("chalk");

// Node.js built-in file system module
const fs = require("fs");

// Custom-made functions

const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");

const _fatalError = require("../functions/fatalError");

const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");

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
 * @param {string} toFind The word or phrase to find.
 */
const fif = (file, toFind, ...args) => {
  try {
    const fileChk = new Checks(file);

    // Check to make sure the file/phrase to find is not empty
    if (fileChk.paramUndefined() || new Checks(toFind).paramUndefined()) {
      Errors.enterParameter("the file and the phrase to find", "fif test.txt hello");
      return;
    }

    // Convert the path to absolute
    file = _replaceSpaces(file);
    file = _convertAbsolute(file);

    // Make sure the file exists
    if (!fileChk.doesExist()) {
      Errors.doesNotExist("file", file);
      return;
    } else if (fileChk.validateType()) {
      Errors.expectedFile(file);
      return;
    } else if (!fileChk.validEncoding()) {
      Errors.invalidEncoding("plain text");
      return;
    }

    // Just to clean it up :)
    const contents = fs.readFileSync(file, { encoding: "utf-8", flag: "r" });

    // You gotta be careful with this
    // The brackets seem to confuse a few

    // Log the number of occurances
    console.log(chalk.bold.underline(`Occurrences:`));

    console.log(
      `Number of occurrences: ${chalk.italic(
        contents.match(new RegExp(toFind, "ig") || []).length
      )}`
    );

    console.log();

    console.log("Occurrence location since start of file:");

    const charNum = [...contents.matchAll(new RegExp(toFind, "ig"))];
    charNum.forEach((val, idx) => {
      console.log(`#${idx + 1}: ${chalk.bold.italic(val.index + 1 ?? "N/A")}`);
    });

    console.log();

    console.log(chalk.bold.underline(`Visual occurrences:\n`));
    console.log(contents.replaceAll(toFind, chalk.bgYellow.black(toFind)));
    console.log();
  } catch (err) {
    _fatalError(err);
  }
};

module.exports = fif;
