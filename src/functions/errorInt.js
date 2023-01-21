const chalk = require("chalk");

const { ERRORS: errors } = require("../../variables/constants");

/**
 * Interpret an error from the `ERRORS` object and `console.log` a formatted string with the error code, error message, and stylings with `chalk`.
 *
 * If the error code does not exist, an `Error` is thrown.
 *
 * Example:
 *
 * ```js
 * _errorInterpret("0x0001", { variable: command });
 * ```
 *
 * @param {string} errorCode The error code from the `ERRORS` object. Make sure it exists before adding it.
 * @param {} options An object containing configuration of the message (e.g. a dynamic variable to display to replace `%VARIABLE%`).
 */
const _errorInterpret = (
  errorCode,
  options = {
    variable: undefined,
    wordCode: undefined,
  }
) => {
  if (typeof errors[errorCode] === "undefined") {
    throw new Error(
      "The error code provided is invalid. Make sure you have added it in constants.js."
    );
  }

  const stringVars = {
    "%VARIABLE%": options.variable,
    "%WORD_CODE%": options.wordCode,
  };

  let errorMessage = errors[errorCode];
  for (let i = 0; i < Object.keys(stringVars).length; i++) {
    if (typeof Object.values(stringVars)[i] === "undefined") {
      continue;
    }
    errorMessage = errorMessage.replace(Object.keys(stringVars)[i], Object.values(stringVars)[i]);
  }

  console.log(chalk.red(`${chalk.bold(`Error code ${errorCode}:`)} ${errorMessage}\n`));
};

module.exports = _errorInterpret;
