const chalk = require("chalk");

/**
 * Class to display various messages, either a success, information, warning, or error (not fatal) message.
 *
 * Initialization is not required, so you can call it like `InfoMessages.success()`.
 *
 * The message is the only required argument for all functions.
 */
class InfoMessages {
  constructor() {}

  static success(message) {
    console.log(chalk.green(`${chalk.white.bgGreen(" SUCCESS: ")} ${message}\n`));
  }

  static info(message) {
    console.log(chalk.blue(`${chalk.white.bgBlue(" INFO: ")} ${message}\n`));
  }

  static warning(message) {
    console.log(chalk.yellow(`${chalk.black.bgYellow(" WARNING: ")} ${message}\n`));
  }

  static error(message) {
    console.log(chalk.red(`${chalk.white.bgRed(" ERROR: ")} ${message}\n`));
  }
}

module.exports = InfoMessages;
