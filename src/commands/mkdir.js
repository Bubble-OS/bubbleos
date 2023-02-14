const chalk = require("chalk");
const { existsSync, mkdirSync } = require("fs");

const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");

const Errors = require("../classes/Errors");
const _fatalError = require("../functions/fatalError");

const mkdir = (dirName) => {
  dirName = _replaceSpaces(dirName);

  if (!dirName) {
    Errors.enterParameter("a directory", "mkdir test");
    return;
  }

  const dir = _convertAbsolute(dirName);

  try {
    if (!existsSync(dir)) {
      console.log(`Making directory: ${chalk.bold.blueBright(dir)}...`);
      mkdirSync(dir);
      console.log(chalk.green("The operation completed successfully.\n"));
    } else {
      Errors.alreadyExists("directory", dir);
    }
  } catch (err) {
    if (err.code === "EPERM") {
      Errors.noPermissions("make the directory", dir);
    } else {
      _fatalError(err);
    }
  }
};

module.exports = mkdir;
