// Get modules
const chalk = require("chalk");

// Get classes
const Checks = require("../classes/Checks");

/**
 * Print text to screen.
 *
 * Usage:
 *
 * ```js
 * print("Hello, world!");
 * ```
 *
 * A warning will be shown if there is no text to
 * output.
 *
 * @param {...string} text The text to output.
 */
const print = (...text) => {
  // If there is no text, show a warning and exit
  if (new Checks(text).paramUndefined()) {
    console.log(chalk.yellow("No text was provided to output.\n"));
    return;
  }

  // Print the text, and end it with a newline
  console.log(`${text.join(" ")}\n`);
};

// Export the function
module.exports = print;
