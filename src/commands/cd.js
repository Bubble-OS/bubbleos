const chalk = require("chalk");

const _replaceSpaces = require("../functions/replaceSpaces");
const _fatalError = require("../functions/fatalError");

const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");

/**
 * Change into a directory (command usage only).
 *
 * Usage:
 *
 * ```js
 * const cd = require("./path/to/cd");
 * cd("test", "-s"); // '-s' is an argument and is optional
 * ```
 *
 * Note that changing a directory in BubbleOS does not reflect across the OS.
 * For example, running BubbleOS in `C:\Users`, then changing into `Test` in BubbleOS, then exiting, would still have the directory as `C:\Users` instead of `C:\Users\Test`.
 *
 * @param {string} dir The directory to change into. Must be a valid directory.
 * @param  {...string} args The arguments that can be passed to modify the behaviour of the command.
 */
const cd = (dir, ...args) => {
  try {
    let dirChk = new Checks(dir);

    const silent = args?.includes("-s") || args?.includes("/s");

    if (dirChk.paramUndefined()) {
      Errors.enterParameter("a directory", "cd test");
      return;
    }

    dir = _replaceSpaces(dir);

    dirChk = new Checks(dir);

    if (!dirChk.doesExist()) {
      Errors.doesNotExist("directory", dir);
      return;
    } else if (!dirChk.validateType()) {
      Errors.expectedDir(dir);
      return;
    }

    process.chdir(dir);

    if (!silent) console.log(`Changed directory to ${chalk.green(process.cwd())}.\n`);
    else console.log();
  } catch (err) {
    if (err.code === "EPERM") {
      Errors.noPermissions("change into", dir);
    } else {
      _fatalError(err);
    }

    return;
  }
};

module.exports = cd;
