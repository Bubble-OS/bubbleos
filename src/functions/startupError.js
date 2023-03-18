const chalk = require("chalk");
const { keyInPause } = require("readline-sync");

const { GLOBAL_NAME } = require("../variables/constants");

const _fatalError = require("./fatalError");

const startupError = (message, doFatalError = false, fatalErrorMessage = "") => {
  console.log(chalk.red(`${message}${doFatalError ? `\n${GLOBAL_NAME} will now crash.\n` : ""}`));
  keyInPause(chalk.red("Press any key to continue . . . "), { guide: false });

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
};

module.exports = startupError;
