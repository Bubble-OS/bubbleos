const chalk = require("chalk");
const { existsSync, mkdirSync } = require("fs");

const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");

const _errorInterpret = require("../functions/errorInt");
const _fatalError = require("../functions/fatalError");

const mkdir = (dirName) => {
  dirName = _replaceSpaces(dirName);

  if (!dirName) {
    _errorInterpret(2, { type: "a directory", example: "mkdir test" });
    return;
  }

  const dir = _convertAbsolute(dirName);

  try {
    if (!existsSync(dir)) {
      console.log(`Making directory: ${chalk.bold.blueBright(dir)}...`);
      mkdirSync(dir);
      console.log(chalk.green("The operation completed successfully.\n"));
    } else {
      _errorInterpret(6, { type: "directory", variable: dir });
    }
  } catch (err) {
    if (err.code === "EPERM") {
      _errorInterpret(4, { todo: "make the directory", variable: dir });
    } else {
      _fatalError(err);
    }
  }
};

module.exports = mkdir;
