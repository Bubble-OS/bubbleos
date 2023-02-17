const chalk = require("chalk");

const fs = require("fs");

const Errors = require("../classes/Errors");
const _convertAbsolute = require("../functions/convAbs");
const _fatalError = require("../functions/fatalError");

const _replaceSpaces = require("../functions/replaceSpaces");

const symblnk = (path, ...params) => {
  if (typeof path === "undefined") {
    Errors.enterParameter("a path", "symblnk test");
    return;
  }

  path = _replaceSpaces(path);
  path = _convertAbsolute(path);

  if (!fs.existsSync(path)) {
    Errors.doesNotExist("file/directory", path);
    return;
  }

  try {
    const isSymblnk = fs.lstatSync(path).isSymbolicLink();

    if (isSymblnk)
      console.log(
        chalk.greenBright(`The path, ${chalk.italic(path)}, ${chalk.bold("is")} a symbolic link.\n`)
      );
    else if (!isSymblnk)
      console.log(
        chalk.hex("#FFA500")`The path, ${chalk.italic(path)}, ${chalk.bold(
          "is not"
        )} a symbolic link.\n`
      );
  } catch (err) {
    if (err.code === "EPERM") {
      Errors.noPermissions("read the file/directory", path);
      return;
    } else {
      _fatalError(err);
    }
  }
};

module.exports = symblnk;
