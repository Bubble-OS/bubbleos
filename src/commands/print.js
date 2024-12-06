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
 * @param {...string} text The text to output.
 */
const print = (...text) => {
  if (new Checks(text).paramUndefined()) {
    console.log();
    return;
  }

  // Print the text, and end it with a newline
  console.log(`${text.join(" ")}\n`);
};

// Export the function
module.exports = print;
