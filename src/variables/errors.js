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

/**
 * A 'does not exist' error message. Make sure to fill in the arguments correctly to make it gramatically correct.
 *
 * Example:
 * ```js
 * _doesNotExistError("directory");
 * ```
 *
 * This should return:
 * ```js
 * "The directory, '%VARIABLE%', does not exist. Make sure that it exists and try again."
 * ```
 *
 * Please note that `%VARIABLE%` will be replaced in the `_errorInterpret` function if passed.
 *
 * @param {string} type The type of item (e.g. 'file', 'directory').
 * @returns A string with the error message.
 */
const _doesNotExistError = (type) =>
  `The ${type}, '${chalk.italic.bold(
    "%VARIABLE%"
  )}', does not exist. Make sure that it exists and try again.`;

/**
 * A 'permission' error message. Make sure to fill in the arguments correctly to make it gramatically correct.
 *
 * Example:
 * ```js
 * _permissionError("remove the directory");
 * ```
 *
 * This should return:
 * ```js
 * "You do not have permission to remove the directory '%VARIABLE%'. Make sure you have the correct permissions and try again."
 * ```
 *
 * Please note that `%VARIABLE%` will be replaced in the `_errorInterpret` function if passed.
 *
 * @param {string} toDo The thing that the user was attempting to do that was not allowed.
 * @returns A string with the error message.
 */
const _permissionError = (toDo) =>
  `You do not have permission to ${toDo} ${chalk.italic.bold(
    "'%VARIABLE%'"
  )}. Make sure you have the correct permissions and try again.`;

/**
 * A 'cancelled' error message. Make sure to fill in the arguments correctly to make it gramatically correct.
 *
 * Note that the `who` argument is optional, and will default to 'user'.
 *
 * Example:
 * ```js
 * _cancelledError("user");
 * ```
 *
 * This should return:
 * ```js
 * "The operation was cancelled by the user."
 * ```
 *
 * @param {string} who The name of the thing that cancelled the operation. Defaults to `user`.
 * @returns A string with the error message.
 */
const _cancelledError = (who = "user") => `The operation was cancelled by the ${who}.`;

/**
 * A 'non-existent' error message. Make sure to fill in the arguments correctly to make it gramatically correct.
 *
 * Example:
 * ```js
 * _permissionError("file");
 * ```
 *
 * This should return:
 * ```js
 * "The file, '%VARIABLE%', does not exist. Make sure it exists and try again."
 * ```
 *
 * Please note that `%VARIABLE%` will be replaced in the `_errorInterpret` function if passed.
 *
 * @param {string} item The item (e.g. 'file', 'directory').
 * @returns A string with the error message.
 */
const _nonExistentError = (item) =>
  `The ${item}, '${chalk.bold.italic(
    "%VARIABLE%"
  )}', does not exist. Make sure it exists and try again.`;

/**
 * An 'OS compatibility' error message. Make sure to fill in the arguments correctly to make it gramatically correct.
 *
 * Note that the `os` argument is optional, and will default to the value of `process.platform`.
 *
 * Example:
 * ```js
 * _cancelledError("macOS");
 * ```
 *
 * This should return:
 * ```js
 * "This command only works on macOS."
 * ```
 *
 * @param {string} os The OS that the command is available to. Defaults to the value of `process.platform`.
 * @returns A string with the error message.
 */
const _osCompatibilityError = (os = process.platform) => `This command only works on ${os}.`;

/**
 * An 'already exists' error message. Make sure to fill in the arguments correctly to make it gramatically correct.
 *
 * Example:
 * ```js
 * _alreadyExistsError("directory");
 * ```
 *
 * This should return:
 * ```js
 * "The directory, '%VARIABLE%', already exists. Make sure that no file/directory with the same name exists and try again."
 * ```
 *
 * Please note that `%VARIABLE%` will be replaced in the `_errorInterpret` function if passed.
 *
 * @param {string} item The item (e.g. 'file', 'directory').
 * @returns A string with the error message.
 */
const _alreadyExistsError = (item) =>
  `The ${item}, ${chalk.bold.italic(
    "'%VARIABLE%'"
  )}, already exists. Make sure that no file/directory with the same name exists and try again.`;

/**
 * An 'in use' error message. Make sure to fill in the arguments correctly to make it gramatically correct.
 *
 * Example:
 * ```js
 * _inUseError("file");
 * ```
 *
 * This should return:
 * ```js
 * "The file, '%VARIABLE%', is being used by another program. End the program and try again."
 * ```
 *
 * Please note that `%VARIABLE%` will be replaced in the `_errorInterpret` function if passed.
 *
 * @param {string} item The item (e.g. 'file', 'directory').
 * @returns A string with the error message.
 */
const _inUseError = (item) =>
  `The ${item}, ${chalk.bold.italic(
    "'%VARIABLE%'"
  )}, is being used by another program. End the program and try again.`;

/**
 * An 'encoding' error message. Make sure to fill in the arguments correctly to make it gramatically correct.
 *
 * Example:
 * ```js
 * _encodingError("UTF-8", "plain text files");
 * ```
 *
 * This should return:
 * ```js
 * "Cannot read any files other than ones encoded in UTF-8 (plain text files)."
 * ```
 *
 * @param {string} encode The encoding that the file needs to be in.
 * @param {string} other A more friendlier way of the type of encoding. Optional; defaults to `""` (empty string).
 * @returns A string with the error message.
 */
const _encodingError = (encode, other = "") =>
  `Cannot read any files other than ones encoded in ${encode}${other ? `(${other})` : ""}.`;

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
  6: _cancelledError("user"),
  7: _permissionError("either read/copy"),
  8: _nonExistentError("source/destination"),
  9: _enterParamError("a file name to execute", "exec explorer.exe"),
  10: _osCompatibilityError("Windows"),
  11: _nonExistentError("directory"),
  12: _enterParamError("a directory name", "mkdir test"),
  13: _alreadyExistsError("directory"),
  14: _permissionError("create the directory"),
  15: _enterParamError("a file name", "mkfile never-gonna-give-you-up.txt"),
  16: _alreadyExistsError("file"),
  17: _permissionError("remove the file"),
  18: _enterParamError("a file name", "readfile test.txt"),
  19: _doesNotExistError("file"),
  20: _encodingError("UTF-8", "plain text files"),
  // 11: _enterParamError("a file/directory", "del never-gonna-let-you-down.txt"),
  // 12: _nonExistentError("file/directory"),
  // 13: _cancelledError("user"),
  // 14: _inUseError("file/directory"),
  // 15: _permissionError("delete the file/directory"),
};
