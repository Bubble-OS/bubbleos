const chalk = require("chalk");

// Get variables
const { COMMANDS: commands, ALIASES: aliases } = require("../variables/commands");

// Get functions
const _fatalError = require("./fatalError");
const { _addToHist } = require("../commands/history");

// Get classes
const Errors = require("../classes/Errors");
const Verbose = require("../classes/Verbose");
const InfoMessages = require("../classes/InfoMessages");

/**
 * Split the commands passed into BubbleOS, and then remove the actual command name (the first word)
 *
 * @param {string} command The entire command that the user entered.
 */
const _multiParam = (command) => {
  // Split the parameters by all of the spaces
  const params = command.split(" ");

  // Remove the first element (the command) and return it
  params.shift();
  return params;
};

const getKeyByValue = (object, value) => Object.keys(object).find((key) => object[key] === value);

/**
 * Interpret all available BubbleOS commands.
 *
 * @param {string} command The command that was requested to be interpreted by the user.
 * @param {boolean} storeInHistory Whether or not to store the command in history. Defaults to true.
 */
const _intCmds = async (command, storeInHistory = true) => {
  try {
    // If the command is empty or not
    Verbose.custom("Checking if command entered is empty...");
    const isEmpty = command.length === 0;
    Verbose.custom("Checking entered command...");
    const enteredCmd = command.split(" ")[0];

    // The command is currently unrecognized
    let recognized = false;

    // Loop through the commands
    for (let [key, value] of Object.entries(commands)) {
      // If the command starts with the current command
      if (enteredCmd === key) {
        Verbose.custom("Command has been recognized.");
        recognized = true;

        // If the command is 'bub', it requires the '_intCmds' function, so call/pass it separately
        Verbose.custom("Executing command...");
        if (key === "bub") {
          await value(_intCmds, ..._multiParam(command));
        } else {
          await value(..._multiParam(command));
        }
      }
    }

    // If the command is not recognized and isn't empty
    if (!recognized && !isEmpty) {
      Verbose.custom(
        `Command '${enteredCmd}' was detected to be unrecognized, show respective error...`
      );
      Errors.unrecognizedCommand(enteredCmd);

      for (const alias of Object.values(aliases)) {
        for (const cmd of alias) {
          if (cmd === enteredCmd) {
            Verbose.custom("Alias detected for entered command, show tip to user...");
            InfoMessages.info(
              `There is no command called ${chalk.italic(enteredCmd)}. Did you mean ${chalk.bold(
                getKeyByValue(aliases, alias)
              )}?`
            );

            break;
          }
        }
      }
    }

    if (!isEmpty && storeInHistory && command !== "history -c") {
      Verbose.custom("Adding command to history...");
      _addToHist(command);
    }
  } catch (err) {
    Verbose.fatalError();
    _fatalError(err);
  }
};

// Export the function
module.exports = _intCmds;
