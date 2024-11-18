// Get modules
const chalk = require("chalk");
const sortKeys = require("sort-keys");

// Get variables
const HELP_MESSAGES = require("../variables/helpMessages");

// Get functions
const _fatalError = require("../functions/fatalError");

// Get classes
const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");

/**
 * Print help depending on if the user requested
 * a single command, or if they wanted all
 * available commands.
 *
 * @param {Object} sorted The object containing the sorted version of the help messages.
 * @param {boolean} specific If the user requested help on a specific command or not. If this is `true`, `cmd` must also be passed.
 * @param {string} cmd The command that the user requested specific help on.
 */
const _printHelp = (sorted, specific, cmd) => {
  // Convert the command to lower case
  cmd = cmd?.toLowerCase();

  // If the user wanted a specific command
  if (specific) {
    // Log the command and its usage
    // If the usage is not available, show 'N/A'
    console.log(`${chalk.bold(cmd)}: ${chalk.italic(sorted[cmd].usage ?? "N/A")}`);

    // Show the description (if it is unavailable, show 'N/A')
    console.log(`\n  ${sorted[cmd].desc ?? "N/A"}\n`);

    // If there are arguments
    if (typeof sorted[cmd].args !== "undefined") {
      // If the length of the arguments is not 0 (not empty)
      if (Object.keys(sorted[cmd].args).length !== 0) {
        // Show an arguments subheading
        console.log("  " + chalk.underline("Arguments:"));

        // Loop through all arguments
        for (const arg in sorted[cmd].args) {
          // Pad the argument at the end, and show each description for their respective argument
          console.log(`    ${arg.padEnd(15)} ${sorted[cmd].args[arg]}`);
        }

        // Log a newline after all of the arguments have been shown
        console.log();
      }
    }

    return;
  } else {
    // Final string of all of the commands
    let finalStr = "";

    // Loop through all of the keys of the help object (sorted)
    for (let i = 1; i < Object.keys(sorted).length + 1; i++) {
      // Add to the final string all of the commands, and pad 15 characters to the end of them
      finalStr += Object.keys(sorted)[i - 1].padEnd(15);

      // If there have been three characters on the line, print a newline
      if (i % 3 === 0) {
        finalStr += "\n";
      }
    }

    // Show the final string
    console.log(finalStr);
    return;
  }
};

/**
 * The 'help' command, which provides detailed help
 * on how to use commands in the BubbleOS shell. This
 * command is only to be used in the BubbleOS CLI!
 *
 * Usage:
 *
 * ```js
 * // Arguments are also accepted!
 * help(); // Help on all commands
 * help("help"); // Help on a specific command
 * ```
 *
 * Available arguments:
 * - `--no-tip`: Don't show the tip.
 *
 * @param {string} command Optionally get help on a specific command.
 * @param  {...string} args Arguments to modify the behavior of `help`.
 */
const help = (command, ...args) => {
  try {
    // Initialize arguments
    const showTip = !(
      args.includes("--no-tip") ||
      command === "--no-tip" ||
    );

    // Make a new array with a list of help messages sorted in alphabetical order
    // Making a new array as HELP_MESSAGES is immutable (cannot be changed)
    const sorted = sortKeys(HELP_MESSAGES);

    // If the user did not ask for help on a specific command
    if (new Checks(command).paramUndefined()) {
      // The user DID NOT want a specific command
      _printHelp(sorted, false);

      // If the user didn't request for a tip, don't show it and instead just print a newline, else, show it
      if (showTip)
        console.log(
          chalk.yellow.italic(
            `\nTip: To get information about a specific command, run ${chalk.italic(
              "'help <command>'"
            )}.\n`
          )
        );
      else console.log();
    } else {
      // If the user wanted information about a specific command
      // Loop through all of the keys in the help object
      for (const commandName in sorted) {
        // If the command in the help object is the same as the one the user entered, show the information
        if (commandName.toLowerCase() === command.toLowerCase()) {
          _printHelp(sorted, true, commandName);
          return;
        }
      }

      // The command didn't match any
      Errors.unrecognizedCommand(command);
    }
  } catch (err) {
    // An unknown error occurred
    _fatalError(err);
  }
};

// Export the function
module.exports = help;
