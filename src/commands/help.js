const chalk = require("chalk");
const sortKeys = require("sort-keys");
const HELP_DEFINITIONS = require("../variables/helpMessages");

const Errors = require("../classes/Errors");

const help = (command) => {
  const sorted = sortKeys(HELP_DEFINITIONS);

  const printHelp = (commandChosen, all) => {
    if (all) {
      console.log(
        `${chalk.red(commandChosen)}: ${chalk.italic(sorted[commandChosen].description)}`
      );

      console.log(`\n${sorted[commandChosen].all}\n`);

      console.log(`\t${chalk.grey(sorted[commandChosen].usage.join(", "))}\n`);
      return;
    } else {
      let finalStr = "";

      for (let i = 1; i < Object.keys(sorted).length + 1; i++) {
        finalStr += Object.keys(sorted)[i - 1].padEnd(15);
        if (i % 3 === 0) {
          finalStr += "\n";
        }
      }

      console.log(finalStr);
      return;
    }
  };

  if (typeof command === "undefined") {
    printHelp(HELP_DEFINITIONS, false);

    console.log(
      chalk.yellow.italic(
        `\nTip: To get information about a specific command, run ${chalk.italic(
          "'help <command>'"
        )}.\n`
      )
    );
  } else {
    for (const commandName in sorted) {
      if (commandName === command) {
        printHelp(commandName, true);
        return;
      }
    }

    Errors.unrecognizedCommand(command);
  }
};

module.exports = help;
