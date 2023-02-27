const chalk = require("chalk");

/**
 * Print text to screen. Named `printText` instead of `print` to avoid naming collisions.
 *
 * @param {string} text The text to output.
 */
const print = (...text) => {
  if (text.length === 0) {
    console.log(chalk.yellow("No text was provided to output.\n"));
    return;
  }

  console.log(`${text.join(" ")}\n`);
};

module.exports = print;
