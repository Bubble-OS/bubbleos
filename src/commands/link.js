const chalk = require("chalk");
const fs = require("fs");

const _parseDoubleQuotes = require("../functions/parseQuotes");
const _convertAbsolute = require("../functions/convAbs");
const _promptForYN = require("../functions/promptForYN");
const _fatalError = require("../functions/fatalError");

const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");

const link = (path, newPath, ...args) => {
  try {
    const unlink =
      args.includes("-u") || args.includes("/u") || newPath === "-u" || newPath === "/u";

    if (!unlink) {
      [path, newPath] = _parseDoubleQuotes([path, newPath, ...args]);
      [path, newPath] = [_convertAbsolute(path), _convertAbsolute(newPath)];
    } else {
      path = _convertAbsolute(_parseDoubleQuotes([path, newPath, ...args])[0]);
    }

    const pathChk = new Checks(path);
    const newPathChk = new Checks(newPath);

    const silent =
      args.includes("-s") || args.includes("/s") || newPath === "-s" || newPath === "/s";
    const confirm = !(
      args?.includes("-y") ||
      args?.includes("/y") ||
      newPath === "-y" ||
      newPath === "/y"
    );

    if (pathChk.paramUndefined() || newPathChk.paramUndefined()) {
      Errors.enterParameter("a path/the paths", "link path newPath");
      return;
    }

    if (!pathChk.doesExist()) {
      Errors.doesNotExist("file/directory", path);
      return;
    }

    if (unlink) {
      if (confirm) {
        if (!_promptForYN(`Are you sure you want to unlink ${chalk.bold(path)}?`)) {
          console.log(chalk.yellow("Process aborted.\n"));
          return;
        }
      }

      fs.unlinkSync(path);

      if (!silent) console.log(chalk.green(`Successfully unlinked ${chalk.bold(path)}.\n`));
      else console.log();

      return;
    }

    fs.linkSync(path, newPath);

    if (!silent)
      console.log(
        chalk.green(`Successfully linked ${chalk.bold(newPath)} to ${chalk.bold(path)}.\n`)
      );
    else console.log();
  } catch (err) {
    if (err.code === "EPERM") {
      Errors.noPermissions("make the symbolic link", newPath);
      return;
    } else {
      _fatalError(err);
    }
  }
};

module.exports = link;
