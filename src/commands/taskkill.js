const chalk = require("chalk");

const _errorInterpret = require("../functions/errorInt");
const _fatalError = require("../functions/fatalError");

const taskkill = (pid) => {
  if (typeof pid === "undefined") {
    _errorInterpret(27);
    return;
  }

  const isNumeric = (str) => {
    if (typeof str !== "string") return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
  };

  if (!isNumeric(pid)) {
    _errorInterpret(28);
    return;
  }

  console.log(`Killing process with PID ${chalk.yellow(pid)}...`);

  try {
    process.kill(Number(pid));
    console.log(`Successfully killed process ${chalk.green(pid)}.\n`);
  } catch (err) {
    if (err.code === "EPERM") {
      _errorInterpret(29, { variable: pid });
    } else {
      _fatalError(err);
    }
  }
};

module.exports = taskkill;
