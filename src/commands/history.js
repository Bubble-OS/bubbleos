const chalk = require("chalk");

const Errors = require("../classes/Errors");

const history = [];
/**
 * The number of history commands to store before deleting the oldest ones.
 */
const NUMBER_TO_STORE = 50;

const historyCmd = (numToDisplay) => {
  const _formatHist = (index, histCmd) => {
    console.log(`  ${index}: ${chalk.bold.yellow(histCmd)}`);
  };

  if (typeof numToDisplay === "undefined") {
    if (history.length === 0) {
      console.log(chalk.yellow("No commands in history yet.\n"));
      return;
    } else {
      for (const [idx, value] of history.entries()) {
        _formatHist(idx + 1, value);
      }
    }

    console.log();
    return;
  }

  if (numToDisplay % 1 !== 0) {
    Errors.invalidCharacters("history point", "numbers", "letters/symbols", numToDisplay);
    return;
  } else if (typeof history[numToDisplay - 1] === "undefined") {
    console.log(chalk.yellow(`Cannot find the command in history point ${numToDisplay}.\n`));
    return;
  }

  _formatHist(numToDisplay, history[numToDisplay - 1]);
  console.log();
};

const _addToHist = (command) => {
  history.push(command);
  if (history.length > NUMBER_TO_STORE) {
    history.shift();
  }
};

module.exports = { historyCmd, _addToHist };
