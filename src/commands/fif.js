// Modules
const fs = require("fs");
const chalk = require("chalk");

// Custom-made functions
const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");
const _fatalError = require("../functions/fatalError");

// Custom-made classes
const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");

/**
 * Find a word or phrase in a file.
 *
 * Usage:
 * ```js
 * fif("test.txt", "hello"); // Can also include an indefinite amount of arguments
 * ```
 *
 * @param {string} file A path to the file to search in. Please note directories are not valid.
 * @param {string} toFind The word or phrase to find.
 * @param {args} All recognized arguments. `-n` for number occurrences, `-p` for places, and `-v` for visual.
 */
const fif = (file, toFind, ...args) => {
  try {
    // Initialize a checker
    const fileChk = new Checks(file);

    // Initialize arguments
    const numOccur = args.includes("-n") || args.includes("/n");
    const placeOccur = args.includes("-p") || args.includes("/p");
    const visualOccur = args.includes("-v") || args.includes("/v");
    const all = !numOccur && !placeOccur && !visualOccur;

    // Check to make sure the file/phrase to find is not empty
    // Make a temporary new checker
    if (fileChk.paramUndefined() || new Checks(toFind).paramUndefined()) {
      Errors.enterParameter("the file and the phrase to find", "fif test.txt hello");
      return;
    }

    // Convert the path to absolute
    file = _replaceSpaces(file);
    file = _convertAbsolute(file);

    if (!fileChk.doesExist()) {
      // If the file doesn't exist
      Errors.doesNotExist("file", file);
      return;
    } else if (fileChk.validateType()) {
      // If the path is a directory
      Errors.expectedFile(file);
      return;
    } else if (!fileChk.validEncoding()) {
      // If the encoding is not plain text
      Errors.invalidEncoding("plain text");
      return;
    }

    // Get file contents
    const contents = fs.readFileSync(file, { encoding: "utf-8", flag: "r" });

    // The RegEx code will match against the contents,
    // and if 'null' is returned, it'll default to [].
    // Otherwise, it will return an array, of which only the length is required.
    // However, if the length is undefined, it will be 'N/A'
    const occurrences = contents.match(new RegExp(toFind, "ig") || [])?.length ?? "N/A";

    // If there are no occurrences
    if (occurrences === "N/A") {
      console.log(
        chalk.yellow(
          `No occurrences were found for the phrase ${chalk.bold.italic(`'${toFind}'`)}.\n`
        )
      );
      return;
    }

    // If at least the number, place, or all was requested, show the subheading
    if (numOccur || placeOccur || all) console.log(chalk.bold.underline(`Occurrences:`));

    // Number of occurrences
    if (numOccur || all) {
      console.log(`Number of occurrences: ${chalk.italic(occurrences)}`);
      console.log();
    }

    // Character occurrence location
    if (placeOccur || all) {
      console.log("Occurrence location since start of file:");

      // Matches each phrase in the content and spreads it into an array
      const charNum = [...contents.matchAll(new RegExp(toFind, "ig"))];

      // Loop through all character occurrences and output them
      charNum.forEach((val, idx) => {
        console.log(`#${idx + 1}: ${chalk.bold.italic(val.index + 1 ?? "N/A")}`);
      });

      console.log();
    }

    // Visible occurrences (file contents will highlighted occurrences)
    if (visualOccur || all) {
      console.log(chalk.bold.underline(`Visual occurrences:\n`));

      // Replace all occurrences with a highlighted version
      console.log(contents.replaceAll(toFind, chalk.bgYellow.black(toFind)));
      console.log();
    }
  } catch (err) {
    // An unknown error occurred
    _fatalError(err);
  }
};

module.exports = fif;
