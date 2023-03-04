const chalk = require("chalk");
const fs = require("fs");

const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");
const _fatalError = require("../functions/fatalError");

const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");

const mkdir = (dir, ...args) => {
  try {
    dir = _convertAbsolute(_replaceSpaces(dir));

    const dirChk = new Checks(dir);

    const silent = args?.includes("-s") || args?.includes("/s");

    if (dirChk.paramUndefined()) {
      Errors.enterParameter("a directory", "mkdir test");
      return;
    }

    if (dirChk.doesExist()) {
      Errors.alreadyExists("directory", dir);
    }

    fs.mkdirSync(dir);

    if (!silent) console.log(chalk.green(`Successfully made the directory ${chalk.bold(dir)}.\n`));
    else console.log();
  } catch (err) {
    if (err.code === "ENOENT") {
      Errors.doesNotExist("directory", dir);
      return;
    } else if (err.code === "EPERM") {
      Errors.noPermissions("make the directory", dir);
      return;
    } else if (err.code === "ENAMETOOLONG") {
      Errors.pathTooLong(dir);
      return;
    } else if (err.code === "EINVAL") {
      Errors.invalidCharacters(
        "directory name",
        "valid path characters",
        "characters such as '?' or ':' (Windows only)",
        dir
      );
      return;
    } else {
      _fatalError(err);
    }
  }
};

module.exports = mkdir;
