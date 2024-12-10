// Get modules
const fs = require("fs");
const chalk = require("chalk");
const path = require("path");

// Get functions
const _parseDoubleQuotes = require("../functions/parseQuotes");
const _convertAbsolute = require("../functions/convAbs");
const _fatalError = require("../functions/fatalError");

// Get classes
const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");
const InfoMessages = require("../classes/InfoMessages");
const Verbose = require("../classes/Verbose");

/**
 * Interpret a BubbleOS file. This function should only be
 * used as a private function to be called inside of `bub()`.
 *
 * The `intCmds()` function **must** be passed at the start.
 * This is because BubbleOS cannot read the function correctly
 * if it imported instead of passed in (it will be an empty
 * object - `{}` - instead of a function).
 *
 * The `options` object contains the following options that
 * can be changed:
 * - `displayCommand`: Whether to display the command that
 * is currently being executed or not. Defaults to `true`.
 * - `allowExit`: Whether to allow exiting BubbleOS completely
 * if the file contains the `exit` command. Defaults to `false`.
 *
 * @param {Function} intCmds The `intCmds` function that needs to be passed as BubbleOS cannot read it properly (as explained above).
 * @param {fs.PathLike | string} file The path the points to the `.bub` file. It should be a `.bub` file, but others are accepted, as there is no such check for this in the function.
 * @param {{ displayCommand: boolean, allowExit: boolean }} options Optional. Defines options that can modify the behaviour of this function. The available keys are listed above.
 */
const _interpretFile = async (
  intCmds,
  file,
  options = { displayCommand: true, allowExit: false }
) => {
  // Gets the contents from the path, and splits it into lines
  Verbose.custom("Reading file and separating into lines...");
  const lines = fs.readFileSync(file, { encoding: "utf-8", flag: "r" }).split("\n");

  Verbose.custom("Creating invalid 'bub' command to avoid an infinite loop...");
  const invalidBubCommand = `bub ${path.basename(file)}`;

  // Loop through the amount of lines
  for (let i = 0; i < lines.length; i++) {
    Verbose.custom("Trimming current line...");
    const line = lines[i]?.trim();

    if (line.startsWith("#") || line === "") {
      Verbose.custom(`Line '${line}' was detected to either be empty or a comment, skipping...`);
      continue;
    } else if (line === invalidBubCommand) {
      Verbose.custom(`Line '${line}' was detected to be an invalid 'bub' command, skipping...`);
      InfoMessages.warning(
        "Infinite loop detected due to executing the same '.bub' file, skipping..."
      );
      continue;
    } else if (line === "exit" && !options.allowExit) {
      Verbose.custom(`Line '${line}' was detected to be the 'exit' command, skipping...`);
      InfoMessages.info("Running the 'exit' command from a '.bub' file is currently disabled.");
      continue;
    }

    // If the 'displayCommand' option is 'true', show the current executing command
    if (options.displayCommand) {
      Verbose.custom("Displaying currently executing command...");
      console.log(chalk.underline.bold.red(line));
    }

    // Interpret the command
    Verbose.custom("Executing command...");
    await intCmds(line, false);
  }
};

/**
 * A command used to interpret a BubbleOS file which ends with `.bub`,
 * similar to a Batch file. To run it in the BubbleOS shell, run `bub`.
 *
 * Usage:
 *
 * ```js
 * // See why you need 'intCmds' below
 * bub(intCmds, "D:\\test.bub"); // 'args' is available too
 * ```
 *
 * The file must end with `.bub`!
 *
 * The `intCmds()` function **must** be passed at the start.
 * This is because BubbleOS cannot read the function correctly
 * if it imported instead of passed in (it will be an empty
 * object - `{}` - instead of a function).
 *
 * Available arguments:
 * - `-d`: Doesn't display the command that is currently executing.
 * - `--alow-exit`: Allows exiting from a `.bub` file if there is
 * an `exit` command in it.
 *
 * @param {Function} intCmds The `intCmds()` function that is needed.
 * @param {fs.PathLike | string} file The path to the BubbleOS file that is going to be executed.
 * @param  {...string} args The arguments, of which the available ones are listed above.
 */
const bub = async (intCmds, file, ...args) => {
  try {
    // Replace spaces and convert to an absolute path
    Verbose.pathAbsolute(file);
    Verbose.parseQuotes();
    file = _convertAbsolute(_parseDoubleQuotes([file, ...args])[0]);

    // Initialize checker
    Verbose.initChecker();
    const fileChk = new Checks(file);

    // Initialize arguments
    Verbose.initArgs();
    const displayCommand = args?.includes("-d");
    const allowExit = args?.includes("--allow-exit");

    // Check if file is not defined
    if (fileChk.paramUndefined()) {
      Verbose.chkEmpty();
      Errors.enterParameter("a file", "bub test.bub");
      return;
    }

    if (!fileChk.doesExist()) {
      Verbose.chkExists(file);
      Errors.doesNotExist("file", file);
      return;
    } else if (fileChk.validateType()) {
      Verbose.chkType(file, "file");
      Errors.expectedFile(file);
      return;
    } else if (!fileChk.validEncoding()) {
      Verbose.chkEncoding();
      Errors.invalidEncoding("plain text");
      return;
    }

    // If the file doesn't end with '.bub', abort
    if (!file.endsWith(".bub")) {
      Verbose.custom(`File '${file}' was detected to not end in '.bub'.`);
      InfoMessages.error(
        `The file must end with '.bub'. Received: '${chalk.bold(
          path.basename(file)
        )}'. Process aborted.`
      );
      return;
    }

    // Interpret the Bubble file
    Verbose.custom("Interpreting file...");
    await _interpretFile(intCmds, file, { displayCommand, allowExit });
  } catch (err) {
    if (err.code === "EPERM") {
      Verbose.permError();
      Errors.noPermissions("read the file", file);
      return;
    } else if (err.code === "EBUSY") {
      Verbose.inUseError();
      Errors.inUse("file", file);
      return;
    } else {
      Verbose.fatalError();
      _fatalError(err);
    }
  }
};

// Export the function
module.exports = bub;
