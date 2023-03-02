// Get modules
const chalk = require("chalk");

const fs = require("fs");
const childProcess = require("child_process");

// Get functions
const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");
const _fatalError = require("../functions/fatalError");

// Get classes
const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");

/**
 * Execute a file from BubbleOS. This is meant to be used as a
 * CLI tool for the BubbleOS shell.
 *
 * Usage:
 *
 * ```js
 * exec("file.exe"); // Arguments are also accepted!
 * ```
 *
 * Please note that even though any extention is accepted, and
 * that BubbleOS will not validate extentions, there are chances
 * when a file cannot run, even when the success message is shown.
 *
 * Available arguments:
 * - `-s`: Silently execute a file. This will silence all outputs
 * to the standard output, except for error messages.
 * - `-h`: Hide the subprocess console window that would normally
 * be created on Windows systems.
 * - `--sh`: If this argument is passed, the executable will run
 * inside of a shell.
 *
 * @param {fs.PathLike | string} file The filename to execute. Both absolute and relative paths are accepted.
 * @param  {...string} args The arguments to change the behaviour of `exec`. Available arguments are listed above.
 * @returns
 */
const exec = (file, ...args) => {
  try {
    // Replace spaces in the path, then convert it to an absolute path
    file = _convertAbsolute(_replaceSpaces(file));

    // Intialize the checker
    const fileChk = new Checks(file);

    // Initialize arguments
    const silent = args?.includes("-s") || args?.includes("/s");
    const winHide = args?.includes("-h") || args?.includes("/h");
    const shell = args?.includes("--sh") || args?.includes("/sh");

    // If the file is not defined
    if (fileChk.paramUndefined()) {
      Errors.enterParameter("a file", "exec test");
      return;
    }

    if (!fileChk.doesExist()) {
      // The file does not exist
      Errors.doesNotExist("file", file);
      return;
    } else if (fileChk.validateType()) {
      // The file is apparently a directory
      Errors.expectedFile(file);
      return;
    }

    // Execute the file
    // Not using execFileSync() as that does not let BubbleOS continue
    // unless the window is closed. This should be used instead, with an
    // empty callback function.
    childProcess.execFile(file, { cwd: process.cwd(), windowsHide: winHide, shell }, () => {});

    // If the user didn't add the '-s' flag, show the success message, else, show a newline
    if (!silent) console.log(chalk.green(`Successfully executed ${chalk.bold(file)}.\n`));
    else console.log();
  } catch (err) {
    if (err.code === "EPERM") {
      // Permission errors running the file
      Errors.noPermissions("run the file", file);
      return;
    } else if (err.code === "EBUSY") {
      // The file is in use
      Errors.inUse("file", file);
      return;
    } else {
      // Unknown error
      _fatalError(err);
    }
  }
};

module.exports = exec;
