const chalk = require("chalk");
const fs = require("fs");

const _errorInterpret = require("../functions/errorInt");

const mkdir = (dirName) => {
  if (typeof dirName === "undefined") {
    _errorInterpret("0x0016");
    return;
  }

  const dir = `./${dirName}`;
  const fullDir = process.cwd() + "\\" + dirName;

  console.log(`Making directory: ${chalk.bold.blueBright(fullDir)}...`);

  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      console.log(chalk.green("The operation completed successfully.\n"));
    } else {
      _errorInterpret("0x0017", { variable: fullDir });
    }
  } catch (err) {
    if (err.code === "EPERM") {
      _errorInterpret("0x0018", { variable: fullDir });
    } else {
      _errorInterpret("0x0019", { variable: fullDir, wordCode: err.code });
    }
  }
};

module.exports = mkdir;
