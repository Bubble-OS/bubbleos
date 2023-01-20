const chalk = require("chalk");

const _errorInterpret = require("../functions/errorInt");

const taskkill = (pid) => {
  if (typeof pid === "undefined") {
    _errorInterpret("0x0041");
    return;
  }

  const isNumeric = (str) => {
    if (typeof str !== "string") return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
  };

  if (!isNumeric(pid)) {
    _errorInterpret("0x0042");
    return;
  }

  console.log(`Killing process with PID ${chalk.yellow(pid)}...`);

  try {
    process.kill(Number(pid));
    console.log(`Successfully killed process ${chalk.green(pid)}.\n`);
  } catch (err) {
    if (err.code === "EPERM") {
      _errorInterpret("0x0043", { variable: pid });
    } else {
      _errorInterpret("0x0044", { variable: pid, wordCode: err.code });
    }
  }
};

module.exports = taskkill;
