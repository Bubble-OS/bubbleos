const chalk = require("chalk");

const Errors = require("../classes/Errors");
const _fatalError = require("../functions/fatalError");

const taskkill = (pid) => {
  if (typeof pid === "undefined") {
    Errors.enterParameter("a PID", "taskkill 1234");
    return;
  }

  const isNumeric = (str) => {
    if (typeof str !== "string") return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
  };

  if (!isNumeric(pid)) {
    Errors.invalidCharacters("PID", "numbers", "letters/symbols", pid);
    return;
  }

  console.log(`Killing process with PID ${chalk.yellow(pid)}...`);

  try {
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
