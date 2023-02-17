const chalk = require("chalk");

const fs = require("fs");

const Errors = require("../classes/Errors");
const _convertAbsolute = require("../functions/convAbs");
const _fatalError = require("../functions/fatalError");

const _replaceSpaces = require("../functions/replaceSpaces");

const symlink = (path, newPath, ...params) => {
  let check = false;
  if (
    params.includes("-c") ||
    params.includes("/c") ||
    newPath === "-c" ||
    newPath === "/c" ||
    newPath === "-c"
  )
    check = true;

  if (typeof path === "undefined" || (!check && typeof newPath === "undefined")) {
    Errors.enterParameter("a path/the paths", "symlink test hello");
    return;
  }

  path = _replaceSpaces(path);
  path = _convertAbsolute(path);
  if (!check) {
    newPath = _replaceSpaces(newPath);
    newPath = _convertAbsolute(newPath);
  }

  if (!check && !fs.existsSync(newPath)) {
    Errors.doesNotExist("file/directory", newPath);
    return;
  }

  try {
    if (check) {
      const isSymlink = fs.lstatSync(path).isSymbolicLink();

      if (isSymlink)
        console.log(
          chalk.greenBright(
            `The path, ${chalk.italic(path)}, ${chalk.bold("is")} a symbolic link.\n`
          )
        );
      else if (!isSymlink)
        console.log(
          chalk.hex("#FFA500")`The path, ${chalk.italic(path)}, ${chalk.bold(
            "is not"
          )} a symbolic link.\n`
        );

      return;
    }

    fs.symlinkSync(newPath, path);

    console.log(chalk.green("The operation completed successfully.\n"));
  } catch (err) {
    if (err.code === "EPERM") {
      Errors.noPermissions("read the file/directory", path);
      return;
    } else {
      _fatalError(err);
    }
  }
};

module.exports = symlink;
