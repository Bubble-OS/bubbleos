const chalk = require("chalk");
const readline = require("readline-sync");

const prompt = () => {
  let command = readline
    .question(`${chalk.bold.green("bubble")} ${chalk.blueBright(process.cwd())} ${chalk.red("$")} `)
    .trim();

  const isEmpty = command.length === 0;
  const isExit = command === "exit";

  return {
    command,
    isEmpty,
    isExit,
  };
};

module.exports = prompt;
