const chalk = require("chalk");
const { question } = require("readline-sync");

const { GLOBAL_NAME } = require("../variables/constants");

const _fatalError = require("./fatalError");

const startupError = (message, doFatalError = false, fatalErrorMessage = "") => {
  try {
    console.log(chalk.red(`${message}${doFatalError ? `\n${GLOBAL_NAME} will now crash.\n` : ""}`));
    question(chalk.red("Press the Enter key to continue . . . "), { hideEchoBack: true, mask: "" });

    console.log();

    if (doFatalError) {
      try {
        throw new Error(fatalErrorMessage);
      } catch (err) {
        _fatalError(err, false);
      }
    } else {
      process.exit(1);
    }
  } catch (err) {
    _fatalError(err);
  }
};

module.exports = startupError;
