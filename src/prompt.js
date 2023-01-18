const chalk = require("chalk");
const promptSync = require("prompt-sync")();

const prompt = () => {
  let command = promptSync(
    `${chalk.bold.green("bubble")} ${chalk.blueBright(process.cwd())} ${chalk.red("$")} `
  );

  try {
    command === command.trim();
  } catch (err) {
    require("./exit");
  }

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
