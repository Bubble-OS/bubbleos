const { red: chalkRed, bold: chalkBold } = require("chalk");

const errors = require("../../variables/constants").ERRORS;

/**
 * Interpret an error from the `ERRORS` object and `console.log` a formatted string with the error code, error message, and stylings with `chalk`.
 *
 * Example:
 *
 * ```js
 * _errorInterpret("0x0001", { variable: command });
 * ```
 *
 * @param {string} errorCode The error code from the `ERRORS` object. Make sure it exists before adding it.
 * @param {} vars An object containing configuration of the message (e.g. a dynamic variable to display to replace `%VARIABLE%`).
 * @param {boolean} newLine Optional; decides whether an error should have a newline/line break at the end or not.
 */
const _errorInterpret = (
  errorCode,
  vars = {
    variable: undefined,
    type: undefined,
    wordCode: undefined,
    example: undefined,
  },
  newLine = true
) => {
  if (typeof errors[errorCode] === "undefined") {
    throw new Error(
      "The error code provided is invalid. Make sure you have added it in constants.js."
    );
  }

  console.log(
    chalkRed(
      `${chalkBold(`Error code ${errorCode}:`)} ${errors[errorCode]
        .replace("%VARIABLE%", vars.variable)
        .replace("%TYPE%", vars.type)
        .replace("%WORD_CODE%", vars.wordCode)
        .replace("%EXAMPLE%", vars.example)}${newLine ? "\n" : ""}`
    )
  );
};

module.exports = _errorInterpret;
