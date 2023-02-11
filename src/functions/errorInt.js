const chalk = require("chalk");

const errors = require("../variables/errors");

/**
 * Interpret an error from the `ERRORS` object and `console.log` a formatted string with the error code, error message, and stylings with `chalk`.
 *
 * If the error code does not exist, an `Error` is thrown.
 *
 * # Error key
 *
 * `0` - Please enter a command. Type 'help' for a list of available commands.
 *
 * `1` - The command, `'%COMMAND%'`, is unrecognized. Type 'help' for a list of available commands.
 *
 * `2` - You must enter `%TYPE%`. For example, enter it like `'%EXAMPLE%'`.
 *
 * `3` - The `%TYPE%`, `'%VARIABLE%'`, does not exist. Make sure that it exists and try again.
 *
 * `4` - You do not have permission to `%TODO%` `'%VARIABLE%'`. Make sure you have the correct permissions and try again.
 *
 * `5` - This command only works on `%OS%`.
 *
 * `6` - The `%TYPE%`, `'%VARIABLE%'`, already exists. Make sure that no file/directory with the same name exists and try again.
 *
 * `7` - The `%TYPE%`, `'%VARIABLE%'`, is being used by another program. End the program and try again.
 *
 * `8` - Cannot read any files other than ones encoded in `%ENCODING%`.
 *
 * `9` - Viewing directories using the `'%COMMAND%'` command is not supported.
 *
 * `10` - The `%TYPE%` can only contain `%SUPPOSED_TO%` and not contain `%NOT_CONTAIN%` (received `'%VARIABLE%'`).
 *
 * Example:
 *
 * ```js
 * _errorInterpret(1, { variable: command });
 * ```
 *
 * @throws An `Error` if the error code does not exist.
 * @param {number} errorCode The error code from the `ERRORS` object. Make sure it exists before adding it.
 * @param {{ variable: string, command: string, type: string, example: string, todo: string, os: string, encoding: string, supposedTo: string, notContain: string }} options An object containing configuration of the message (e.g. a dynamic variable to display to replace `%VARIABLE%`).
 */
const _errorInterpret = (
  errorCode,
  options = {
    variable: "",
    command: "",
    type: "",
    example: "",
    todo: "",
    os: "",
    encoding: "",
    supposedTo: "",
    notContain: "",
  }
) => {
  if (typeof errors[errorCode] === "undefined")
    throw new Error(
      "The error code provided is invalid. Make sure you have added it in constants.js."
    );

  const stringVars = {
    "%VARIABLE%": options.variable,
    "%COMMAND%": options.command,
    "%TYPE%": options.type,
    "%EXAMPLE%": options.example,
    "%TODO%": options.todo,
    "%OS%": options.os,
    "%ENCODING%": options.encoding,
    "%SUPPOSED_TO%": options.supposedTo,
    "%NOT_CONTAIN%": options.notContain,
  };

  let errorMessage = errors[errorCode];
  for (let i = 0; i < Object.keys(stringVars).length; i++)
    errorMessage = errorMessage.replace(Object.keys(stringVars)[i], Object.values(stringVars)[i]);

  console.log(chalk.red(`${chalk.bold(`[${errorCode}]`)} ${errorMessage}\n`));
};

module.exports = _errorInterpret;
