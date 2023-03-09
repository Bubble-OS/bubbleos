// Get modules
const chalk = require("chalk");

// Get variables
const { GLOBAL_NAME } = require("../variables/constants");

// Get functions
const _promptForYN = require("../functions/promptForYN");
const _fatalError = require("../functions/fatalError");

// Get classes
const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");

/**
 * Check if a supposed number is really numerical
 * or not. Checks if it is a string first, then
 * checks if it has a value of `NaN` (not a number).
 *
 * @param {any} val The value to validate.
 * @returns If the value is a number, returns `true`, else, returns `false`.
 */
const _isNumeric = (val) => {
  // If the value is not a string...
  if (typeof val === "string") return false;

  // Return if is number is not NaN
  return !isNaN(val) && !isNaN(parseFloat(val));
};

/**
 * Kill a process on the device from the BubbleOS
 * CLI shell (only).
 *
 * Usage:
 *
 * ```js
 * taskkill(1234); // Arguments are also accepted!
 * ```
 *
 * Kill a process using the provided PID (process
 * identification number).
 *
 * Available arguments:
 * - `-y`: Automatically accept the confirmation
 * prompt.
 * - `-s`: Silence all success messages, excluding
 * error messages and the confirmation prompt.
 * - `--kill-self`: Allow killing the BubbleOS process.
 * Use this flag at your own risk, as it can remove any
 * unsaved data in BubbleOS!
 *
 * @param {string | number} pid The PID to kill.
 * @param  {...string} args Arguments to change the behavior of `taskkill` (listed above).
 */
const taskkill = (pid, ...args) => {
  try {
    // Convert the PID to number form
    pid = Number(pid);

    // Initialize checker
    const pidChk = new Checks(pid);

    // Initialize arguments
    const confirm = !(args?.includes("-y") || args?.includes("/y"));
    const silent = args?.includes("-s") || args?.includes("/s");
    const killSelf = args?.includes("--kill-self") || args?.includes("/kill-self");

    // If the PID is not defined
    if (pidChk.paramUndefined()) {
      Errors.enterParameter("a PID", "taskkill 1234");
      return;
    }

    // If the PID consists of characters other than numeric ones
    if (!_isNumeric(pid)) {
      Errors.invalidCharacters("PID", "numbers", "letters/symbols", pid);
      return;
    }

    // If the PID is equal to BubbleOS' PID and the user did not give permission to kill itself
    if (pid === process.pid && !killSelf) {
      console.log(
        chalk.yellow(
          `You cannot kill the ${GLOBAL_NAME} process. To kill ${GLOBAL_NAME}, run the ${chalk.italic(
            "'exit'"
          )} command.\nOperation cancelled.\n`
        )
      );
      return;
    }

    // If the user did not use the '-y' flag
    if (confirm) {
      if (!_promptForYN(`Are you sure you want to kill the process with PID ${chalk.bold(pid)}?`)) {
        console.log(chalk.yellow("Operation cancelled.\n"));
        return;
      }
    }

    // Kill the process
    process.kill(pid);

    // If the user did not request output, show a newline, else, show the success message
    if (!silent) console.log(chalk.green(`Successfully killed the process ${chalk.bold(pid)}.\n`));
    else console.log();
  } catch (err) {
    if (err.code === "EPERM") {
      // Permission error
      Errors.noPermissions("kill the process with PID", pid);
    } else if (err.code === "ESRCH") {
      // Process does not exist
      Errors.doesNotExist("PID", pid);
    } else {
      // Unknown error
      _fatalError(err);
    }
  }
};

// Export the function
module.exports = taskkill;
