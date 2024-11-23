// Get modules
const fs = require("fs");
const chalk = require("chalk");
const { question } = require("readline-sync");

// Get functions
const _parseDoubleQuotes = require("../functions/parseQuotes");
const _convertAbsolute = require("../functions/convAbs");
const _replaceSpaces = require("../functions/replaceSpaces");
const _fatalError = require("../functions/fatalError");

// Get classes
const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");

/**
 * Escape all special characters in RegExp.
 *
 * This will add the ignore character (`\`) before
 * all special characters (ironically using RegExp)!
 *
 * See [this website](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping)
 * for more information.
 *
 * @param {string} str The string to replace all special RegExp characters with.
 * @returns The string will all special characters ignored.
 */
const escapeRegExp = (str) => str.replaceAll(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Find a word or phrase in a file. This is a CLI
 * tool to be used in the BubbleOS shell only.
 *
 * Usage:
 *
 * ```js
 * fif("test.txt"); // Also accepts arguments!
 * ```
 *
 * This function will find all occurrences in a file
 * and show them in multiple ways to the standard
 * output. For example, it will show the number of
 * occurrences found, the character position since the
 * start of the file for each occurrence, and a visual
 * occurrences text will the occurrences highlighted.
 *
 * Available arguments:
 * - `-n`: Show the number of occurrences.
 * - `-p`: Show the character occurrences.
 * - `-v`: Show the visual occurrences.
 *
 * _Note: If no arguments are passed that are either `-n`, `-p` or `-v`, it will show all of them._
 *
 * @param {string} file A path to the file to search in. Please note directories are not valid.
 * @param {...string} args All recognized arguments. All available arguments are listed above.
 */
const fif = (file, ...args) => {
  try {
    // Replace spaces, and then convert the path to absolute
    file = _convertAbsolute(_parseDoubleQuotes([file, ...args])[0]);

    // Initialize a checker
    const fileChk = new Checks(file);

    // Initialize arguments
    const numOccur = args.includes("-n");
    const placeOccur = args.includes("-p");
    const visualOccur = args.includes("-v");
    const all = !numOccur && !placeOccur && !visualOccur;

    // Check to make sure the file/phrase to find is not empty
    // Make a temporary new checker
    if (fileChk.paramUndefined()) {
      Errors.enterParameter("the file", "fif test.txt");
      return;
    }

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

    // Prompt the user for file contents
    // Replace '*n' with newlines
    // TODO replace with another non-deprecated function and remove _replaceSpaces entirely
    const toFind =
      _replaceSpaces(
        question(
          `Please enter the phrase to find (${chalk.italic("'Enter'")} to accept; ${chalk.italic(
            "'*n'"
          )} for a newline): `
        ),
        "*n",
        "\n"
      ) ?? "";

    console.log();

    if (
      toFind === null ||
      typeof toFind === "undefined" ||
      (typeof toFind === "string" && !toFind)
    ) {
      console.log(chalk.yellow(`No phrase entered.\nProcess aborted.\n`));
      return;
    }

    // The RegExp code will match against the contents,
    // and if 'null' is returned, it'll default to [].
    // Otherwise, it will return an array, of which only the length is required.
    // However, if the length is undefined, it will be 'N/A'.
    const occurrences =
      contents.match(new RegExp(escapeRegExp(toFind), "g") || [])?.length ?? "N/A";

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
    if (numOccur || placeOccur || all) console.log(chalk.red.bold.underline(`Occurrences`));

    // Number of occurrences
    if (numOccur || all) {
      console.log(`Number of occurrences: ${chalk.italic(occurrences)}`);
      console.log();
    }

    // Character occurrence location
    if (placeOccur || all) {
      console.log("Occurrence location since start of file:");

      // Matches each phrase in the content and spreads it into an array
      const charNum = [...contents.matchAll(new RegExp(escapeRegExp(toFind), "g"))];

      // Loop through all character occurrences and output them
      charNum.forEach((val, idx) => {
        console.log(`#${idx + 1}: ${chalk.bold.italic(val.index + 1 ?? "N/A")}`);
      });

      console.log();
    }

    // Visible occurrences (file contents will highlighted occurrences)
    if (visualOccur || all) {
      console.log(chalk.red.bold.underline(`Visual occurrences\n`));

      // Replace all occurrences with a highlighted version
      console.log(
        contents.replaceAll(new RegExp(escapeRegExp(toFind), "g"), chalk.bgYellow.black(toFind))
      );
      console.log();
    }
  } catch (err) {
    // An unknown error occurred
    _fatalError(err);
  }
};

// Export the function
module.exports = fif;
