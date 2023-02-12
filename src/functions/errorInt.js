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
 * `3` - The `%TYPE%`, `'%VARIABLE%'`, does not exist in the file system (ENOENT).
 *
 * `4` - You do not have permission to `%TODO%` `'%VARIABLE%'`. You need elevated privileges (EPERM).
 *
 * `5` - This command only works on `%OS%`.
 *
 * `6` - The `%TYPE%`, `'%VARIABLE%'`, already exists (EEXIST).
 *
 * `7` - The `%TYPE%`, `'%VARIABLE%'`, is currently being used (EBUSY).
 *
 * `8` - Cannot read any files other than ones encoded in `%ENCODING%`.
 *
 * `9` - The `'%COMMAND%'` command expected a file, but got a directory (EISDIR).
 *
 * `10` - The `%TYPE%` can only contain `%SUPPOSED_TO%` and not contain `%NOT_CONTAIN%` (received `'%VARIABLE%'`).
 *
 * `11` - The `'%COMMAND%'` command expected a directory, but got a file (ENOTDIR).
 *
 * `12` - The directory, `'%VARIABLE%'`, is not empty (ENOTEMPTY).
 *
 * `13` - An attempt was made to access `'%VARIABLE%'`, which is forbidden by its permissions (EACCES).
 *
 * `14` - There are too many files open in the system. Close at least one to continue (EMFILE).
 *
 * `15` - The `%TYPE%` cannot be the same name. Please choose a different name.
 *
 * `16` - The `%TYPE%` can only end in the `'%EXTENTION%'` file extention.
 *
 * Example:
 *
 * ```js
 * _errorInterpret(1, { variable: command });
 * ```
 *
 * @deprecated As of `v0.6.6`, this function is deprecated. Use the new `Errors` class instead.
 * @throws An `Error` if the error code does not exist.
 * @param {number} errorCode The error code from the `ERRORS` object. Make sure it exists before adding it.
 * @param {{ variable: string, command: string, type: string, example: string, todo: string, os: string, encoding: string, supposedTo: string, notContain: string, extention: string }} options An object containing configuration of the message (e.g. a dynamic variable to display to replace `%VARIABLE%`).
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
    extention: "",
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
    "%EXTENTION%": options.extention,
  };

  let errorMessage = errors[errorCode];
  for (let i = 0; i < Object.keys(stringVars).length; i++)
    errorMessage = errorMessage.replace(Object.keys(stringVars)[i], Object.values(stringVars)[i]);

  console.log(chalk.red(`${chalk.bold(`[${errorCode}]`)} ${errorMessage}\n`));
};

module.exports = _errorInterpret;
