const chalk = require("chalk");
const readline = require("readline-sync");

const prompt = () => {
  let command = readline
    .question(`${chalk.bold.green("bubble")} ${chalk.blueBright(process.cwd())} ${chalk.red("$")} `)
    ?.trim();

  const isEmpty = command.length === 0;

  return {
    command,
    isEmpty,
  };
};

module.exports = prompt;
