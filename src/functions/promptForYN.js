const chalk = require("chalk");
const { keyInYN } = require("readline-sync");

const _promptForYN = (message) => {
  if (!keyInYN(`${message} [${chalk.green("y")}/${chalk.red.bold("N")}] `, { guide: false }))
    return false;
  else return true;
};

module.exports = _promptForYN;
