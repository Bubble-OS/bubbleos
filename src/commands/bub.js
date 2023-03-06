// Get modules
const fs = require("fs");
const chalk = require("chalk");

// Get functions
const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");
const _fatalError = require("../functions/fatalError");

// Get classes
const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");

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
 * @param {fs.PathLike | string} path The path the points to the `.bub` file. It should be a `.bub` file, but others are accepted, as there is no such check for this in the function.
 * @param {{ displayCommand: boolean, allowExit: boolean }} options Optional. Defines options that can modify the behaviour of this function. The available keys are listed above.
 */
const _interpretBubbleFile = (
  intCmds,
  path,
  options = { displayCommand: true, allowExit: false }
) => {
  // Gets the contents from the path, and splits it into lines
  const lines = fs.readFileSync(path, { encoding: "utf-8", flag: "r" }).split("\n");

  // Loop through the amount of lines
  for (let i = 0; i < lines.length; i++) {
    // Get the current line and trim it, unless it is 'null' or 'undefined'
    const line = lines[i]?.trim();

    if (line.startsWith("#") || line === "") {
      // If the line is a comment (#) or is blank, skip it
      continue;
    } else if (line.startsWith("exit") && !options.allowExit) {
      // If the command found is 'exit' and BubbleOS isn't allowed to exit:
      console.log(
        chalk.yellow(
          `${chalk.bold(
            `Message from ${chalk.italic("'bub'")}:`
          )} You cannot run the ${chalk.italic("'exit'")} command from a ${chalk.italic(
            "'.bub'"
          )} file.\n`
        )
      );
      continue;
    }

    // If the 'displayCommand' option is 'true', show the current executing command
    if (options.displayCommand) console.log(chalk.italic.underline.bold.red(line));

    // Interpret the command
    intCmds(line);
  }
};

/**
 * A command used to interpret a BubbleOS file which ends with `.bub`,
 * similar to a Batch file. To run it in the BubbleOS shell, run `bub`.
 *
 * To use this function in code:
 * ```js
 * // See why you need 'intCmds' below
 * bub(intCmds, "D:\\test.bub"); // 'args' is available too
 * ```
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
const bub = (intCmds, file, ...args) => {
  try {
    // Replace spaces and convert to an absolute path
    file = _convertAbsolute(_replaceSpaces(file));

    // Initialize checker
    const fileChk = new Checks(file);

    // Initialize arguments
    const displayCommand = !(args?.includes("-d") || args?.includes("/d"));
    const allowExit = args?.includes("--allow-exit") || args?.includes("/allow-exit");

    // Check if file is not defined
    if (fileChk.paramUndefined()) {
      Errors.enterParameter("a file", "bub test.bub");
      return;
    }

    // Add '.bub' to the end of the file in case it is already not present
    file = file.endsWith(".bub") ? file : `${file}.bub`;

    if (!fileChk.doesExist()) {
      // If it does NOT exist
      Errors.doesNotExist("file", file);
      return;
    } else if (fileChk.validateType()) {
      // If the path passed was a directory
      Errors.expectedFile(file);
      return;
    } else if (!fileChk.validEncoding()) {
      // If the file is not plain text
      Errors.invalidEncoding("plain text");
      return;
    }

    // Interpret the Bubble file
    _interpretBubbleFile(intCmds, file, { displayCommand, allowExit });
  } catch (err) {
    if (err.code === "EPERM") {
      // If there are invalid permissions to read the file
      Errors.noPermissions("read the file", file);
      return;
    } else if (err.code === "EBUSY") {
      // If the file is being used
      Errors.inUse("file", file);
      return;
    } else {
      // Unknown error
      _fatalError(err);
    }
  }
};

// Export the function
module.exports = bub;
