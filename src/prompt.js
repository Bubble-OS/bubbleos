const chalk = require("chalk");
const { question } = require("readline-sync");

const prompt = () => {
  let command = question(
    `${chalk.bold.green("bubble")} ${chalk.blueBright(process.cwd())} ${chalk.red("$")} `
  )?.trim();

  const isEmpty = command.length === 0;
  const isExit = command === "exit";

  return {
    command,
    isEmpty,
    isExit,
  };
};

module.exports = prompt;
