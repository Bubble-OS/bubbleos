// Get variables
const commands = require("../variables/commands");

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
  // TODO convert this to a for...in loop
  for (let i = 0; i < Object.keys(commands).length; i++) {
    // If the command starts with the current command
    if (command.startsWith(Object.keys(commands)[i])) {
      // Make the command recognized
      recognized = true;
      // If the command is 'bub', it requires the '_intCmds' function, so call/pass it separately
      if (Object.keys(commands)[i] === "bub")
        await Object.values(commands)[i](_intCmds, ..._multiParam(command));
      // Call the respective function and pass in the arguments
      else await Object.values(commands)[i](..._multiParam(command));
    }
  }

  // If the command is not recognized and isn't empty
  if (!recognized && !isEmpty) Errors.unrecognizedCommand(command.split(" ")[0]);
  // If the command wasn't empty, add it to the history
  if (!isEmpty) _addToHist(command);
};

// Export the function
module.exports = _intCmds;
