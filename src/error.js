const chalk = require("chalk");

const { RECOGNIZED_COMMANDS } = require("../variables/constants");

const error = (prompt) => {
  if (!RECOGNIZED_COMMANDS.includes(prompt.command.split(" ")[0])) {
    if (prompt.isEmpty) {
      console.log(
        `${chalk.red("Please enter a command.")} Type 'help' for a list of available commands.`
      );

      console.log();
    } else {
      console.log(
        `${chalk.red(
          `${prompt.command}`
        )} is not a recognized command. Type 'help' for a list of available commands.`
      );

      console.log();
    }
  }
};

module.exports = error;
