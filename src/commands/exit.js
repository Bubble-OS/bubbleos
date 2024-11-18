// Get variables
const { GLOBAL_NAME } = require("../variables/constants");
const { history } = require("./history");

const _manageConfig = require("../functions/manageConfig");

/**
 * Exit the BubbleOS shell with an exit code of
 * `0` (success). This is a CLI tool for use with
 * the BubbleOS shell only. It is recommended to
 * use the command over `^C`, as `^C` force-closes
 * BubbleOS, making the system unstable, as well as
 * exiting the process with an exit code of `1`
 * (failed) instead of the success code.
 *
 * Usage:
 *
 * ```js
 * exit(); // Arguments are also accepted!
 * ```
 *
 * The exit command should not be used for generic
 * exiting. To exit because an unknown error occurred,
 * use the `_fatalError()` function instead.
 *
 * Available arguments:
 * - `-c`: Clears the _stdout_ (standard output) after
 * BubbleOS has completed shutting down completely
 * (similar to `cls()`).
 *
 * @param {...string} args Arguments to modify the behavior of the `exit()` function. See available ones above.
 */
const exit = (...args) => {
  // Show the user that BubbleOS is shutting down/exiting
  console.log(`Exiting the ${GLOBAL_NAME} shell...\n`);

  // If the user requested to clear the screen after exiting, do so
  if (args.includes("-c")) process.stdout.write("\x1bc");

  if (!_manageConfig("add", { history })) {
    console.log(chalk.red(`${GLOBAL_NAME} failed to save the history.\n`));
  }

  // Exit BubbleOS (Node.js) with an exit code of '0' (success)
  process.exit(0);
};

// Export the function
module.exports = exit;
