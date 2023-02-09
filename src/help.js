const chalk = require("chalk");
const sortKeys = require("sort-keys");
const HELP_DEFINITIONS = require("./variables/helpMessages");

const _errorInterpret = require("./functions/errorInt");

const help = (command) => {
  const sorted = sortKeys(HELP_DEFINITIONS);

  const printHelp = (commandChosen, all) => {
    console.log(`${chalk.red(commandChosen)}: ${chalk.italic(sorted[commandChosen].description)}`);

    if (all) {
      console.log(`\n${sorted[commandChosen].all}\n`);
    }

    console.log(`\t${chalk.grey(sorted[commandChosen].usage.join(", "))}\n`);
    return;
  };

  if (typeof command === "undefined") {
    for (const commandName in sorted) {
      printHelp(commandName, false);
    }

    console.log(
      chalk.yellow.italic(
        "Tip: To get more information about a specific command, run 'help <command>'.\n"
      )
    );
  } else {
    for (const commandName in sorted) {
      if (commandName === command) {
        printHelp(commandName, true);
        return;
      }
    }

    console.log("Command unknown (temp err msg)\n");
  }
};

module.exports = help;
