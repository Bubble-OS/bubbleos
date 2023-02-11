const chalk = require("chalk");

const time = () => {
  const time = new Date();

  console.log(chalk.dim.underline("Current time:"));
  console.log(chalk.bold(`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}\n`));
};

module.exports = time;
