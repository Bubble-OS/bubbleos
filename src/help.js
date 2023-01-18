const chalk = require("chalk");
const { DEFINITIONS } = require("../variables/constants");

const help = (command) => {
  const printHelp = (commandChosen) => {
    console.log(
      `${chalk.red(commandChosen)}: ${chalk.italic(DEFINITIONS[commandChosen].description)}`
    );
    console.log(`\t${chalk.grey(DEFINITIONS[commandChosen].usage.join(", "))}\n`);

    return;
  };

  if (typeof command === "undefined") {
    for (const commandName in DEFINITIONS) {
      printHelp(commandName);
    }
  } else {
    for (const commandName in DEFINITIONS) {
      if (commandName === command) {
        printHelp(commandName);

        break;
      }
    }
  }
};

module.exports = help;
