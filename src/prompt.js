const chalk = require("chalk");
const { question } = require("readline-sync");

const _errorInterpret = require("./functions/errorInt");

const prompt = () => {
  let command = question(
    `${chalk.bold.green("bubble")} ${chalk.blueBright(process.cwd())} ${chalk.red("$")} `
  );

  command === command.trim();

  const isEmpty = command.length === 0;
  const isExit = command === "exit";

  return {
    command,
    isEmpty,
    isExit,
  };
};

module.exports = prompt;
