// Get modules
const chalk = require("chalk");

// Get functions
const _manageConfig = require("../functions/manageConfig");
const _fatalError = require("../functions/fatalError");

// Get classes
const Errors = require("../classes/Errors");

/**
 * The number of history commands to store before deleting the oldest ones.
 */
const NUMBER_TO_STORE = 50;

/**
 * The history CLI command for the BubbleOS shell.
 * The command is named as is to avoid naming
 * collisions with the array `history`.
 *
 * Usage:
 *
 * ```js
 * historyCmd(); // All commands in history
 * historyCmd(1); // First command in history
 * ```
 *
 * This function gets all commands from the `history`
 * array. All commands are added in the history by
 * the `_addToHist()` function.
 *
 * No arguments are accepted in the command.
 *
 * @param {number | string} numToDisplay Optional. The number point in history to display by itself. If it is not provided, it will show all commands in history.
 */
const historyCmd = (numToDisplay, ...args) => {
  try {
    // Private function to format history output
    const _formatHist = (index, histCmd) => {
      console.log(`  ${index}: ${chalk.bold.yellow(histCmd)}`);
    };

    const clear = args.includes("-c") || numToDisplay === "-c";

    // Clear history if "-c" is passed
    if (clear) {
      if (typeof _manageConfig("get").parsed === "undefined") {
        console.log(
          chalk.red(
            `${chalk.white.bgRed(
              " ERROR: "
            )} Error when reading history from the configration file. Resetting file...\n`
          )
        );

        _manageConfig("delete");
        _manageConfig("create");
        return;
      }

      _manageConfig("remove", "history");
      console.log(chalk.green("Cleared the history.\n"));
      return;
    }

    // Fetch history from the config file
    if (typeof _manageConfig("get").parsed === "undefined") {
      console.log(
        chalk.red(
          `${chalk.white.bgRed(
            " ERROR: "
          )} Error when reading history from the configration file. Resetting file...\n`
        )
      );

      _manageConfig("delete");
      _manageConfig("create");
      return;
    }

    const historyConfig = _manageConfig("get").parsed.history ?? [];

    if (typeof numToDisplay === "undefined") {
      if (historyConfig.length === 0) {
        console.log(chalk.yellow("No commands in history yet.\n"));
        return;
      }

      // Display all history entries
      for (const [idx, value] of historyConfig.entries()) {
        _formatHist(idx + 1, value);
      }

      console.log();
      return;
    }

    // Validate the input and display specific history point
    if (numToDisplay % 1 !== 0) {
      Errors.invalidCharacters("history point", "numbers", "letters/symbols", numToDisplay);
      return;
    } else if (typeof historyConfig[numToDisplay - 1] === "undefined") {
      console.log(chalk.yellow(`Cannot find the command in history point ${numToDisplay}.\n`));
      return;
    }

    _formatHist(numToDisplay, historyConfig[numToDisplay - 1]);
    console.log();
    return;
  } catch (err) {
    _fatalError(err);
  }
};

/**
 * Add a command to the history to be later
 * shown in the BubbleOS command `history`.
 *
 * Usage:
 *
 * ```js
 * _addToHist("history");
 * ```
 *
 * This command appends to an array, which
 * is stored in the JavaScript heap. This means
 * that when BubbleOS is shut down, the history
 * will be cleared.
 *
 * @param {string} command The command that the user entered that should be stored in the history.
 * @param {boolean} addToConfig Whether or not to add the command to the BubbleOS configuration. Defaults to `true`.
 */
const _addToHist = (command, addToConfig = true) => {
  if (!addToConfig) return;

  // Fetch the history from the config
  if (typeof _manageConfig("get").parsed === "undefined") {
    console.log(
      chalk.red(
        `${chalk.white.bgRed(
          " ERROR: "
        )} Error when saving command to history in the configration file. Resetting file...\n`
      )
    );

    _manageConfig("delete");
    _manageConfig("create");
    return;
  }

  const historyConfig = _manageConfig("get").parsed.history ?? [];

  // If the number of stored commands exceeds the limit, remove the oldest entry
  if (historyConfig.length + 1 > NUMBER_TO_STORE) historyConfig.shift();

  // Add the latest command to the history
  historyConfig.push(command);

  // Replace the history array in the config
  _manageConfig("add", { history: historyConfig });
};

// Export all the functions
module.exports = { historyCmd, _addToHist };
