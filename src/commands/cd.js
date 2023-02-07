const chalk = require("chalk");

const _replaceSpaces = require("../functions/replaceSpaces");
const _errorInterpret = require("../functions/errorInt");
const _fatalError = require("../functions/fatalError");

const cd = (dir) => {
  dir = _replaceSpaces(dir);

  if (!dir) {
    _errorInterpret(2);
    return;
  }

  try {
    process.chdir(dir);
  } catch (err) {
    if (err.code === "ENOENT") {
      _errorInterpret(3, { variable: dir });
    } else if (err.code === "EPERM") {
      _errorInterpret(4, { variable: dir });
    } else {
      _fatalError(err);
    }
    return;
  }

  console.log(`Changed directory to ${chalk.green(process.cwd())}.\n`);
};

module.exports = cd;
