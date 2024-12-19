const chalk = require("chalk");

const { GLOBAL_NAME } = require("../variables/constants");

const _promptForYN = require("../functions/promptForYN");
const _fatalError = require("../functions/fatalError");

const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");
const InfoMessages = require("../classes/InfoMessages");
const Verbose = require("../classes/Verbose");

/**
 * Kill a process on the device from the BubbleOS
 * CLI shell, using the provided PID (process
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
 * @param {...string} args Arguments to change the behavior of `taskkill` (listed above).
 */
const taskkill = (pid, ...args) => {
  try {
    Verbose.initChecker();
    const pidChk = new Checks(pid);

    Verbose.initArgs();
    const confirm = !args?.includes("-y");
    const silent = args?.includes("-s");
    const killSelf = args?.includes("--kill-self");

    if (pidChk.paramUndefined()) {
      Verbose.chkEmpty();
      Errors.enterParameter("a PID", "taskkill 1234");
      return;
    } else if (isNaN(Number(pid))) {
      Verbose.custom("PID was detected to not be a number.");
      Errors.invalidCharacters("PID", "numbers", "numbers/special characters", pid);
      return;
    }

    // If the PID is equal to BubbleOS' PID and the user did not give permission to kill itself
    if (Number(pid) === process.pid && !killSelf) {
      Verbose.custom("Attempted to kill BubbleOS process...");
      console.log(
        chalk.yellow(
          `You cannot kill the ${GLOBAL_NAME} process. To exit ${GLOBAL_NAME}, run the ${chalk.italic(
            "'exit'"
          )} command.\nProcess aborted.\n`
        )
      );
      return;
    }

    // If the user did not use the '-y' flag
    if (confirm) {
      Verbose.promptUser();
      if (!_promptForYN(`Are you sure you want to kill the process with PID ${chalk.bold(pid)}?`)) {
        console.log(chalk.yellow("Process aborted.\n"));
        return;
      }
    }

    Verbose.custom("Attempting to kill process...");
    process.kill(Number(pid));

    // If the user did not request output, show a newline, else, show the success message
    if (!silent) InfoMessages.success(`Successfully killed the process ${chalk.bold(pid)}.`);
    else console.log();
  } catch (err) {
    if (err.code === "EPERM") {
      Verbose.permError();
      Errors.noPermissions("kill the process with PID", pid);
    } else if (err.code === "ESRCH") {
      Verbose.custom(`The process with PID '${pid}' was detected to not exist.`);
      Errors.doesNotExist("PID", pid);
    } else {
      Verbose.fatalError();
      _fatalError(err, false);
    }
  }
};

module.exports = taskkill;
