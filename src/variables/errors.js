const chalk = require("chalk");

/**
 * An 'enter parameter' error message. Make sure to fill in the arguments correctly to make it gramatically correct.
 *
 * Example:
 * ```js
 * _enterParamError("a file", "command file.txt");
 * ```
 *
 * This should return:
 * ```js
 * "You must enter a file. For example, enter it like 'command file.txt'."
 * ```
 *
 * @param {string} item The item with 'a' or 'the', depending on the plural form.
 * @param {string} example An example of the command to enter.
 * @returns A string with the error message.
 */
const _enterParamError = (item, example) =>
  `You must enter ${item}. For example, enter it like ${chalk.italic.bold(`'${example}'`)}.`;

const _doesNotExistError = (type) =>
  `The ${type}, '${chalk.italic.bold(
    "%VARIABLE%"
  )}', does not exist. Make sure that it exists and try again.`;

const _permissionError = (toDo) =>
  `You do not have permission to ${toDo} ${chalk.italic.bold(
    "'%VARIABLE%'"
  )}. Make sure you have the correct permissions and try again.`;

const _cancelledError = (who = "user") => `The operation was cancelled by the ${who}.`;

const _nonExistantError = (item) =>
  `The ${item}, '${chalk.bold("%VARIABLE%")}', does not exist. Make sure they exist and try again.`;

const _osCompatibilityError = (os = process.platform) => `This command only works on ${os}.`;

/**
 * An object of errors that are used globally by BubbleOS.
 *
 * **DO NOT** modify any error codes without modifying the called error.
 */
const ERRORS = {
  0: `Please enter a command. Type ${chalk.italic("'help'")} for a list of available commands.`,
  1: `The command '${chalk.bold("%VARIABLE%")}' is unrecognized. Type ${chalk.italic(
    "'help'"
  )} for a list of available commands.`,
  2: _enterParamError("a directory", "cd test"),
  3: _doesNotExistError("directory"),
  4: _permissionError("change into"),
  5: _enterParamError("the source and/or destination", "copyfile test.txt D:\\test.txt"),
  6: _cancelledError(),
  7: _permissionError("either read/copy"),
  8: _nonExistantError("source/destination"),
  9: _enterParamError("a file name to execute", "exec explorer.exe"),
  10: _osCompatibilityError("Windows"),
};
