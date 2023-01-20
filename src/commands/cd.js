const chalk = require("chalk");

const _errorInterpret = require("../functions/errorInt");

const cd = (dir) => {
  if (typeof dir === "undefined") {
    _errorInterpret("0x0002", { type: "directory", example: "cd test" });
    return;
  }

  try {
    process.chdir(dir);
  } catch (err) {
    if (err.code === "ENOENT") {
      _errorInterpret("0x0003", { variable: dir, type: "directory", wordCode: err.code });
    } else if (err.code === "EPERM") {
      _errorInterpret("0x0004", { variable: dir, type: "directory", wordCode: err.code });
    } else {
      _errorInterpret("0x0005", { variable: dir, wordCode: err.code });
    }
    return;
  }

  console.log(`Changed directory to ${chalk.green(process.cwd())}.\n`);
};

module.exports = cd;
