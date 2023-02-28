const chalk = require("chalk");

const _promptForYN = require("../functions/promptForYN");
const _fatalError = require("../functions/fatalError");

const Errors = require("../classes/Errors");
const { GLOBAL_NAME } = require("../variables/constants");

const taskkill = (pid, ...args) => {
  if (typeof pid === "undefined") {
    Errors.enterParameter("a PID", "taskkill 1234");
    return;
  }

  const confirm = !(args.includes("-y") || args.includes("/y"));
  const killSelf = args.includes("--kill-self") || args.includes("/kill-self");

  const isNumeric = (str) => {
    if (typeof str !== "string") return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
  };

  if (!isNumeric(pid)) {
    Errors.invalidCharacters("PID", "numbers", "letters/symbols", pid);
    return;
  }

  if (Number(pid) === process.pid && !killSelf) {
    console.log(
      chalk.yellow(
        `You cannot kill the ${GLOBAL_NAME} process. To kill ${GLOBAL_NAME}, run the ${chalk.italic(
          "'exit'"
        )} command.\nOperation cancelled.\n`
      )
    );
    return;
  }

  if (confirm) {
    if (!_promptForYN(`Are you sure you want to kill the process with PID ${chalk.bold(pid)}?`)) {
      console.log(chalk.yellow("Operation cancelled.\n"));
      return;
    }

    console.log();
  }

  try {
    console.log(`Killing process with PID ${chalk.yellow(pid)}...`);
    process.kill(Number(pid));
    console.log(`Successfully killed process ${chalk.green(pid)}.\n`);
  } catch (err) {
    if (err.code === "EPERM") {
      Errors.noPermissions("kill the process with PID", pid);
    } else {
      _fatalError(err);
    }
  }
};

module.exports = taskkill;
