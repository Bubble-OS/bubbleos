const chalk = require("chalk");
const fs = require("fs");

const _parseDoubleQuotes = require("../functions/parseQuotes");
const _fatalError = require("../functions/fatalError");
const _caseSensitivePath = require("../functions/caseSensitivePath");

const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");
const Verbose = require("../classes/Verbose");
const InfoMessages = require("../classes/InfoMessages");

/**
 * The `cd` command, used to change into a directory.
 *
 * Note that changing a directory in BubbleOS does not reflect in the terminal
 * session when BubbleOS is exited out of.
 *
 * @param {string} dir The directory to change into. Must be a valid directory.
 * @param {...string} args The arguments that can be passed to modify the behavior of the command.
 */
const cd = (dir, ...args) => {
  try {
    // Converts path into case-sensitive path for Windows, and resolves spaces
    Verbose.parseQuotes();
    dir = _caseSensitivePath(_parseDoubleQuotes([dir, ...args])[0]);

    Verbose.initChecker();
    const dirChk = new Checks(dir);

    Verbose.initArgs();
    const silent = args?.includes("-s");

    if (dirChk.paramUndefined()) {
      Verbose.chkEmpty();
      Errors.enterParameter("a directory", "cd test");
      return;
    }

    if (!dirChk.doesExist()) {
      Verbose.chkExists(dir);
      Errors.doesNotExist("directory", dir);
      return;
    } else if (dirChk.pathUNC()) {
      Errors.invalidUNCPath();
      return;
    }

    // Checks if path is a symbolic link to see where it is pointing if it is
    Verbose.custom("Checking if path is a symbolic link...");
    const isSymlink = fs.lstatSync(dir).isSymbolicLink();

    if (isSymlink) {
      Verbose.custom("Path is a symbolic link; finding where it is pointing to...");
      const symlinkPath = fs.readlinkSync(dir);

      // If the path it is pointing to is a file, throw an error
      if (!new Checks(symlinkPath).validateType()) {
        Verbose.custom("Symbolic link points to a file.");
        Errors.expectedDir(dir);
        return;
      }

      // Change the directory to the symbolic link pointing path
      Verbose.custom(
        `Changing directory to the specified destination '${chalk.italic(
          symlinkPath
        )}' (symbolic link)...`
      );
      process.chdir(symlinkPath);

      if (!silent)
        InfoMessages.success(`Successfully changed the directory to ${chalk.bold(symlinkPath)}.`);
      else console.log();
    } else if (dirChk.validateType()) {
      // If not a symlink, change directory normally
      Verbose.custom(
        `Path is not a symbolic link, changing directory to the specified destination '${chalk.italic(
          dir
        )}'...`
      );
      process.chdir(dir);

      if (!silent)
        InfoMessages.success(`Successfully changed the directory to ${chalk.bold(dir)}.`);
      else console.log();
    } else {
      Verbose.chkType(dir, "directory");
      Errors.expectedDir(dir);
      return;
    }
  } catch (err) {
    if (err.code === "EPERM") {
      Verbose.permError();
      Errors.noPermissions("change into", dir);
      return;
    } else {
      Verbose.fatalError();
      _fatalError(err);
    }
  }
};

module.exports = cd;
