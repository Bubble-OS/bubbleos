const chalk = require("chalk");
const fs = require("fs");

const _convertAbsolute = require("../functions/convAbs");

const _errorInterpret = require("../functions/errorInt");
const _fatalError = require("../functions/fatalError");

const mkdir = (dirName) => {
  if (!dirName) {
    _errorInterpret(12);
    return;
  }

  const dir = _convertAbsolute(dirName);

  try {
    if (!fs.existsSync(dir)) {
      console.log(`Making directory: ${chalk.bold.blueBright(dir)}...`);
      fs.mkdirSync(dir);
      console.log(chalk.green("The operation completed successfully.\n"));
    } else {
      _errorInterpret(13, { variable: dir });
    }
  } catch (err) {
    if (err.code === "EPERM") {
      _errorInterpret(14, { variable: dir });
    } else {
      _fatalError(err);
    }
  }
};

module.exports = mkdir;
