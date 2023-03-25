const chalk = require("chalk");
const lockSystem = require("lock-system");

const { GLOBAL_NAME } = require("../variables/constants");

const _friendlyOS = require("../functions/friendlyOS");
const _fatalError = require("../functions/fatalError");

const Errors = require("../classes/Errors");

const lock = (...args) => {
  try {
    lockSystem();

    console.log(chalk.green(`${GLOBAL_NAME} has successfully locked ${_friendlyOS()}!`));
    if (Math.random() < 0.1) console.log(chalk.dim("We'll make sure no thieves get in! :D"));

    console.log();
    return;
  } catch (err) {
    if (err.message.toLowerCase().includes("unsupported os")) {
      Errors.invalidOS("Windows, macOS and/or Linux");
      return;
    } else if (err.message.toLowerCase().includes("no applicable command found")) {
      console.log(
        chalk.red(
          "Locking the OS failed. Please consider installing xdg-screensaver, gnome-screensaver, cinnamon-screensaver, or dm-tool, and try again.\n"
        )
      );
      return;
    }
    _fatalError(err);
  }
};

module.exports = lock;
