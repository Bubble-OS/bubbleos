const chalk = require("chalk");
const lockSystem = require("lock-system");

const _fatalError = require("../functions/fatalError");

const lock = () => {
  try {
    console.log(chalk.yellow("WARNING: Very unstable command. Do not use right now! :)"));

    lockSystem();
  } catch (err) {
    _fatalError(err);
  }
};

module.exports = lock;
