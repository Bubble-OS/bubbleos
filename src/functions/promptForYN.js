// Import modules
const chalk = require("chalk");
const yn = require("yn");
const { question } = require("readline-sync");

/**
 * Prompt the user for a yes/no prompt message.
 *
 * Prompts the user for a confirmation. By default,
 * if the user enters any character other than _'y'_,
 * it will automatically decline and return `false`.
 * Otherwise, it will accept and return `true`.
 *
 * Usage:
 *
 * ```js
 * _promptForYN("Would you like to continue?");
 * // Expected:
 * // Would you like to continue? [y/N]
 * ```
 *
 * @param {string} message The message to display to the user in the yes/no prompt.
 */
const _promptForYN = (message) =>
  yn(question(`${message} [${chalk.green("y")}/${chalk.red.bold("N")}] `, { guide: false }), {
    lenient: true,
  });

// Export the function
module.exports = _promptForYN;
