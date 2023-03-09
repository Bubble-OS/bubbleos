// Get modules
const chalk = require("chalk");

// Get classes
const Errors = require("../classes/Errors");

/**
 * A 'global' array of all of the commands in the
 * history, which is stored in the JavaScript heap.
 *
 * @type string[]
 */
const history = [];
/**
 * The number of history commands to store before deleting the oldest ones.
 */
const NUMBER_TO_STORE = 50;

/**
 * The history CLI command for the BubbleOS shell.
 * The command is named as is to avoid naming
 * collisions with the array `history`.
 *
 * Usage:
 *
 * ```js
 * historyCmd(); // All commands in history
 * historyCmd(1); // First command in history
 * ```
 *
 * This function gets all commands from the `history`
 * array. All commands are added in the history by
 * the `_addToHist()` function.
 *
 * No arguments are accepted in the command.
 *
 * @param {number | string} numToDisplay Optional. The number point in history to display by itself. If it is not provided, it will show all commands in history.
 */
const historyCmd = (numToDisplay, ...args) => {
  /**
   * An extremely private and simple command to format
   * the way history displays.
   *
   * Usage:
   *
   * ```js
   * _formatHist(1, "history");
   * ```
   *
   * Note that this command does not return anything;
   * it just preforms a `console.log()` instead. Uses
   * Chalk.
   *
   * @param {string | number} index The index of the command entered. Must be either a `string` or a `number`.
   * @param {string} histCmd The command in that point of history.
   */
  const _formatHist = (index, histCmd) => {
    // Add two spaces to the start as well
    console.log(`  ${index}: ${chalk.bold.yellow(histCmd)}`);
  };

  // If the user did not request for a specific history point
  if (typeof numToDisplay === "undefined") {
    // If the length of the history array is '0' (no history yet)
    if (history.length === 0) {
      console.log(chalk.yellow("No commands in history yet.\n"));
      return;
    } else {
      // Loop through the entries of history, and get the index and command
      // Add one to the index to make it user-friendly
      for (const [idx, value] of history.entries()) {
        _formatHist(idx + 1, value);
      }
    }

    // Newline and return
    console.log();
    return;
  }

  if (numToDisplay % 1 !== 0) {
    // If the number contains a string (if this check is 'NaN')
    Errors.invalidCharacters("history point", "numbers", "letters/symbols", numToDisplay);
    return;
  } else if (typeof history[numToDisplay - 1] === "undefined") {
    // If the user-requested history point could not be found
    console.log(chalk.yellow(`Cannot find the command in history point ${numToDisplay}.\n`));
    return;
  }

  // Make sure to minus one out of the index finding due to JavaScript's weird array indexes ;)
  _formatHist(numToDisplay, history[numToDisplay - 1]);

  // Newline
  console.log();
  return;
};

/**
 * Add a command to the history to be later
 * shown in the BubbleOS command `history`.
 *
 * Usage:
 *
 * ```js
 * _addToHist("history");
 * ```
 *
 * This command appends to an array, which
 * is stored in the JavaScript heap. This means
 * that when BubbleOS is shut down, the history
 * will be cleared.
 *
 * @param {string} command The command that the user entered that should be stored in the history.
 */
const _addToHist = (command) => {
  // Add the command to the end of the history array
  history.push(command);

  // If the length of history is greater than the number is is supposed to store...
  if (history.length > NUMBER_TO_STORE) {
    // ...remove the oldest (first) element in the history array
    history.shift();
  }
};

// Export all the functions
module.exports = { historyCmd, _addToHist };
