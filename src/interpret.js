const commands = require("./variables/commands");

const _multiParam = require("./functions/multiParam");
const { _addToHist } = require("./commands/history");

const Errors = require("./classes/Errors");

/**
 * Interpret all available BubbleOS commands.
 *
 * @param {string} command The command that was requested to be interpretted by the user.
 */
const _intCmds = (command) => {
  const isEmpty = command.length === 0;

  if (isEmpty) Errors.enterCommand();

  if (command.startsWith("exit")) {
    require("./exit");
  }

  let recognized = false;
  for (let i = 0; i < Object.keys(commands).length; i++) {
    if (command.startsWith(Object.keys(commands)[i])) {
      recognized = true;
      if (Object.keys(commands)[i] === "bub")
        Object.values(commands)[i](_intCmds, ..._multiParam(command));
      else Object.values(commands)[i](..._multiParam(command));
    }
  }

  if (!recognized && !isEmpty) Errors.unrecognizedCommand(command);
  if (!isEmpty) _addToHist(command);

  recognized = false;
};

module.exports = _intCmds;
