const chalk = require("chalk");
const promptSync = require("prompt-sync")();

const prompt = () => {
  const command = promptSync(
    `${chalk.bold.green("bubble")} ${process.cwd()} ${chalk.red("$")} `
  ).trim();

  const isEmpty = command.length === 0;
  const isExit = command === "exit";
  const isHelp = command.startsWith("help");

  return {
    command,
    isEmpty,
    isExit,
    isHelp,
  };
};

module.exports = prompt;
