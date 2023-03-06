const chalk = require("chalk");
const fs = require("fs");

const _convertAbsolute = require("../functions/convAbs");
const _replaceSpaces = require("../functions/replaceSpaces");
const _fatalError = require("../functions/fatalError");

const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");
const { GLOBAL_NAME } = require("../variables/constants");

const symlink = (path, newPath, ...args) => {
  try {
    const check =
      args.includes("-c") || args.includes("/c") || newPath === "-c" || newPath === "/c";

    path = _convertAbsolute(_replaceSpaces(path));
    if (!check) newPath = _convertAbsolute(_replaceSpaces(newPath));

    const pathChk = new Checks(path);
    const newPathChk = new Checks(newPath);

    if (pathChk.paramUndefined() || newPathChk.paramUndefined()) {
      Errors.enterParameter("a path/the paths", "symlink notSymbol symbol");
      return;
    }

    if (!pathChk.doesExist()) {
      Errors.doesNotExist("file/directory", path);
      return;
    }

    if (check) {
      if (fs.lstatSync(path).isSymbolicLink())
        console.log(chalk.greenBright(`The path, ${chalk.italic(path)}, is a symbolic link.\n`));
      else
        console.log(
          chalk.hex("#FFA500")`The path, ${chalk.italic(path)}, is not a symbolic link.\n`
        );

      return;
    }

    fs.symlinkSync(path, newPath);

    console.log(chalk.green(`Successfully linked ${chalk.bold(newPath)} to ${chalk.bold(path)}.`));
  } catch (err) {
    if (err.code === "EPERM") {
      console.log(chalk.yellow(`Tip: Try running ${GLOBAL_NAME} with elevated privileges.`));
      Errors.noPermissions("make the symbolic link", newPath);
      return;
    } else {
      _fatalError(err);
    }
  }
};

module.exports = symlink;
