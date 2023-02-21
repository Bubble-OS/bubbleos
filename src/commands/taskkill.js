const chalk = require("chalk");

const _promptForYN = require("../functions/promptForYN");
const _fatalError = require("../functions/fatalError");

const Errors = require("../classes/Errors");

const taskkill = (pid, ...params) => {
  if (typeof pid === "undefined") {
    Errors.enterParameter("a PID", "taskkill 1234");
    return;
  }

  const confirm = !(params.includes("-y") || params.includes("/y"));

  const isNumeric = (str) => {
    if (typeof str !== "string") return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
  };

  if (!isNumeric(pid)) {
    Errors.invalidCharacters("PID", "numbers", "letters/symbols", pid);
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
