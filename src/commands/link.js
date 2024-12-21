const chalk = require("chalk");
const fs = require("fs");

const _parseDoubleQuotes = require("../functions/parseQuotes");
const _convertAbsolute = require("../functions/convAbs");
const _caseSensitivePath = require("../functions/caseSensitivePath");
const _promptForYN = require("../functions/promptForYN");
const _fatalError = require("../functions/fatalError");

const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");
const InfoMessages = require("../classes/InfoMessages");
const Verbose = require("../classes/Verbose");

/**
 * Creates a hard link on the system.
 *
 * @param {string} path The path to make the link point to.
 * @param {string} newPath The new path that points to the existing path.
 * @param {...string} args Arguments for the `link` command.
 */
const link = (path, newPath, ...args) => {
  try {
    Verbose.initArgs();
    const unlink = args.includes("-u") || newPath === "-u";
    const silent = args.includes("-s") || newPath === "-s";
    const confirm = !(args?.includes("-y") || newPath === "-y");

    if (!unlink) {
      // Parse input and normalize paths when 'unlink' is false
      Verbose.parseQuotes();
      [path, newPath] = _parseDoubleQuotes([path, newPath, ...args]);

      Verbose.pathAbsolute(path);
      path = _caseSensitivePath(_convertAbsolute(path));
      Verbose.pathAbsolute(newPath);
      newPath = _caseSensitivePath(_convertAbsolute(newPath));
    } else {
      // Parse input and normalize only the first path when 'unlink' is true
      Verbose.pathAbsolute(path);
      Verbose.parseQuotes();
      path = _convertAbsolute(_parseDoubleQuotes([path, newPath, ...args])[0]);
    }

    Verbose.initChecker();
    const pathChk = new Checks(path);
    const newPathChk = new Checks(newPath);

    if (pathChk.paramUndefined() || newPathChk.paramUndefined()) {
      Verbose.chkEmpty();
      Errors.enterParameter("a path/the paths", "link path newPath");
      return;
    }

    if (!pathChk.doesExist()) {
      Verbose.chkExists();
      Errors.doesNotExist("file/directory", path);
      return;
    } else if (pathChk.pathUNC()) {
      Verbose.chkUNC();
      Errors.invalidUNCPath();
      return;
    }

    if (unlink) {
      // Unlinks file
      if (confirm) {
        Verbose.promptUser();
        if (!_promptForYN(`Are you sure you want to unlink ${chalk.bold(path)}?`)) {
          console.log(chalk.yellow("Process aborted.\n"));
          return;
        }
      }

      Verbose.custom("Unlinking file...");
      fs.unlinkSync(path);

      if (!silent) InfoMessages.success(`Successfully unlinked ${chalk.bold(path)}.`);
      else console.log();
      return;
    }

    // Links file
    Verbose.custom("Linking file...");
    fs.linkSync(path, newPath);

    if (!silent)
      InfoMessages.success(`Successfully linked ${chalk.bold(newPath)} to ${chalk.bold(path)}.`);
    else console.log();
  } catch (err) {
    if (err.code === "EPERM") {
      Verbose.permError();
      Errors.noPermissions("make the link", newPath);
      return;
    } else {
      Verbose.fatalError();
      _fatalError(err);
    }
  }
};

module.exports = link;
