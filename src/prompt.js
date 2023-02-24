const chalk = require("chalk");
const { question } = require("readline-sync");

const prompt = () => {
  let command = question(
    `${chalk.bold.green("bubble")} ${chalk.blueBright(process.cwd())} ${chalk.red("$")} `
  )?.trim();

  return command;
};

module.exports = prompt;
