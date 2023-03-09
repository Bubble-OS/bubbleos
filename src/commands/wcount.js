// Get modules
const chalk = require("chalk");
const fs = require("fs");

// Get functions
const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");
const _fatalError = require("../functions/fatalError");

// Get classes
const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");

/**
 * Count the number of words, lines, and characters
 * in a file. This is a CLI command in use in the
 * BubbleOS shell.
 *
 * Usage:
 *
 * ```js
 * wcount("test.txt"); // Arguments accepted!
 * ```
 *
 * Count the number of lines, words, characters with
 * whitespace and the opposite. In the scenario that
 * the characters with whitespace and the characters
 * without are the same, it will only show it as one
 * value.
 *
 * Available arguments:
 * - `-l`: Only shows the number of lines in a file.
 * - `-w`: Only shows the number of words in a file.
 * - `-c`: Only shows the number of characters in a file.
 *
 * @param {fs.PathLike | string} file The file to count the words in.
 * @param  {...string} args Arguments to modify the behavior of `wcount`.
 */
const wcount = (file, ...args) => {
  try {
    // Replace spaces in the file, and then convert it to an absolute path
    file = _convertAbsolute(_replaceSpaces(file));

    // Initialize file checker
    const fileChk = new Checks(file);

    // Initialize arguments
    const lines = args?.includes("-l") || args?.includes("/l");
    const words = args?.includes("-w") || args?.includes("/w");
    const chars = args?.includes("-c") || args?.includes("/c");

    // In case the user did not add any filter arguments, show them all!
    const all = !lines && !words && !chars;

    // If the file is not defined
    if (fileChk.paramUndefined()) {
      Errors.enterParameter("a file", "wcount text.txt");
      return;
    }

    if (!fileChk.doesExist()) {
      // The file provided doesn't exist
      Errors.doesNotExist("file", file);
      return;
    } else if (fileChk.validateType()) {
      // The file is actually a directory :)
      Errors.expectedFile(file);
      return;
    } else if (!fileChk.validEncoding()) {
      // The file is not in plain text
      Errors.invalidEncoding("plain text");
      return;
    }

    // Get the contents of the file in UTF-8
    const contents = fs.readFileSync(file, { encoding: "utf-8", flag: "r" });

    // Data of the file to make the next code neater
    const data = {
      lines: contents.split("\n").length,
      words: contents.split(" ").length,
      charsWhite: contents.length,
      charsNoWhite: contents.replaceAll(" ", "").length,
    };

    // If the lines/words/characters are provided, or none was provided (a.k.a all), show them
    if (lines || all) console.log(`Lines: ${chalk.bold(data.lines)}`);
    if (words || all) console.log(`Words: ${chalk.bold(data.words)}`);

    if (chars || all) {
      // If the characters with whitespace are the same as the characters without whitespace, just show one
      if (data.charsWhite === data.charsNoWhite) {
        console.log(`Characters: ${chalk.bold(data.charsWhite)}`);
      } else {
        console.log(`Characters (including whitespace): ${chalk.bold(data.charsWhite)}`);
        console.log(`Characters (excluding whitespace): ${chalk.bold(data.charsNoWhite)}`);
      }
    }

    // Newline and return
    console.log();
    return;
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

// Export the function
module.exports = wcount;
