const chalk = require("chalk");

// Get variables
const { COMMANDS: commands, ALIASES: aliases } = require("../variables/commands");

// Get functions
const { _addToHist } = require("../commands/history");

// Get classes
const Errors = require("../classes/Errors");

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

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

/**
 * Interpret all available BubbleOS commands.
 *
 * @param {string} command The command that was requested to be interpreted by the user.
 */
const _intCmds = async (command) => {
  // If the command is empty or not
  const isEmpty = command.length === 0;

  // The command is currently unrecognized
  let recognized = false;

  // Loop through the commands
  for (let [key, value] of Object.entries(commands)) {
    // If the command starts with the current command
    if (command.startsWith(key)) {
      // Make the command recognized
      recognized = true;
      // If the command is 'bub', it requires the '_intCmds' function, so call/pass it separately
      if (key === "bub") {
        await value(_intCmds, ..._multiParam(command));
      } else {
        await value(..._multiParam(command));
      }
    }
  }

  // If the command is not recognized and isn't empty
  if (!recognized && !isEmpty) {
    const enteredCmd = command.split(" ")[0];
    Errors.unrecognizedCommand(enteredCmd);

    for (const alias of Object.values(aliases)) {
      for (const cmd of alias) {
        if (cmd === enteredCmd) {
          console.log(
            chalk.yellow(
              `No command found called '${chalk.italic(enteredCmd)}'.\nDid you mean '${chalk.bold(
                getKeyByValue(aliases, alias)
              )}'?\n`
            )
          );

          break;
        }
      }
    }
  }
  // If the command wasn't empty, add it to the history
  if (!isEmpty) _addToHist(command);
};

// Export the function
module.exports = _intCmds;
