const chalk = require("chalk");
const fs = require("fs");
const _convertAbsolute = require("../functions/convAbs");

const _errorInterpret = require("../functions/errorInt");

const mkdir = (dirName) => {
  if (typeof dirName === "undefined") {
    _errorInterpret("0x0016");
    return;
  }

  const dir = _convertAbsolute(dirName);
  console.log(`Making directory: ${chalk.bold.blueBright(dir)}...`);

  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      console.log(chalk.green("The operation completed successfully.\n"));
    } else {
      _errorInterpret("0x0017", { variable: dir });
    }
  } catch (err) {
    if (err.code === "EPERM") {
      _errorInterpret("0x0018", { variable: dir });
    } else {
      _errorInterpret("0x0019", { variable: dir, wordCode: err.code });
    }
  }
};

module.exports = mkdir;
