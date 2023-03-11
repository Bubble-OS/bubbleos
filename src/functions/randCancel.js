const chalk = require("chalk");

/**
 * Show a random cancel message from the `messages`
 * array. Note that all messages have an equal
 * chance of occurring.
 *
 * Logs the message chosen.
 *
 * `messages` defaults to:
 *
 * ```js
 * [
 *   "Process aborted."
 * ]
 * ```
 *
 * @param {string[]} messages The messages to find a random one out of. Defaults above.
 */
const _randomCancel = (messages = ["Process aborted."]) => {
  if (messages.length === 1) console.log(chalk.yellow(messages[0] + "\n"));
  else console.log(chalk.yellow(messages[(Math.random() * messages.length).toFixed(0)]) + "\n");
};

// Export the function
module.exports = _randomCancel;
