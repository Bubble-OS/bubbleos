const chalk = require("chalk");
const { DEFINITIONS } = require("../variables/constants");

const help = (command) => {
  const printHelp = (commandChosen, all) => {
    console.log(
      `${chalk.red(commandChosen)}: ${chalk.italic(DEFINITIONS[commandChosen].description)}`
    );

    if (all) {
      console.log();
      console.log(DEFINITIONS[commandChosen].all);
      console.log();
    }

    console.log(`\t${chalk.grey(DEFINITIONS[commandChosen].usage.join(", "))}\n`);

    return;
  };

  if (typeof command === "undefined") {
    for (const commandName in DEFINITIONS) {
      printHelp(commandName, false);
    }

    console.log(
      chalk.yellow.italic(
        "Tip: To get more information about a specific command, run 'help <command>'.\n"
      )
    );
  } else {
    for (const commandName in DEFINITIONS) {
      if (commandName === command) {
        printHelp(commandName, true);

        break;
      }
    }
  }
};

module.exports = help;
