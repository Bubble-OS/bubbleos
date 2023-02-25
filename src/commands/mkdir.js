const chalk = require("chalk");
const { existsSync, mkdirSync } = require("fs");

const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");

const Errors = require("../classes/Errors");
const _fatalError = require("../functions/fatalError");

const mkdir = (dir) => {
  if (typeof dir === "undefined") {
    Errors.enterParameter("a directory", "mkdir test");
    return;
  }

  dir = _replaceSpaces(dir);
  dir = _convertAbsolute(dir);

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
    } else if (err.code === "ENAMETOOLONG") {
      Errors.pathTooLong(dir);
    } else if (err.code === "EINVAL") {
      Errors.invalidCharacters(
        "directory name",
        "valid path characters",
        "characters such as '?' or ':' (Windows only)",
        dir
      );
    } else {
      _fatalError(err);
    }
  }
};

module.exports = mkdir;
