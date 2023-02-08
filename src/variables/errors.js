const chalk = require("chalk");

const {
  _alreadyExistsError,
  _cancelledError,
  _containsInvalidCharactersError,
  _doesNotExistError,
  _encodingError,
  _enterParamError,
  _inUseError,
  _nonExistentError,
  _osCompatibilityError,
  _permissionError,
  _unrecognizedCommandError,
  _viewDirectoryError,
} = require("../functions/errorTexts");

/**
 * An object of errors that are used globally by BubbleOS.
 *
 * **DO NOT** modify any error codes without modifying the called error. It is recommended to append rather than add in the middle.
 *
 * Viewing the source of the `ERRORS` object will have comments like so to easily locate a command's error codes.
 *
 * ```js
 * // 'cd' command
 * ```
 */
const ERRORS = {
  // Basic root command errors
  0: `Please enter a command. Type ${chalk.italic("'help'")} for a list of available commands.`, // No need for a function, since this error message is only used once
  1: _unrecognizedCommandError(),
  // 'cd' command
  2: _enterParamError("a directory", "cd test"),
  3: _doesNotExistError("directory"),
  4: _permissionError("change into"),
  // 'copyfile' command
  5: _enterParamError("the source and/or destination", "copyfile test.txt D:\\test.txt"),
  6: _cancelledError("user"),
  7: _permissionError("either read/copy"),
  8: _nonExistentError("source/destination"),
  // 'exec' command
  9: _enterParamError("a file name to execute", "exec explorer.exe"),
  10: _osCompatibilityError("Windows"),
  11: _nonExistentError("file"),
  // 'mkdir' command
  12: _enterParamError("a directory name", "mkdir test"),
  13: _alreadyExistsError("directory"),
  14: _permissionError("create the directory"),
  // 'mkfile' command
  15: _enterParamError("a file name", "mkfile never-gonna-give-you-up.txt"),
  16: _alreadyExistsError("file"),
  17: _permissionError("remove the file"),
  // 'readfile' command
  18: _enterParamError("a file name", "readfile test.txt"),
  19: _doesNotExistError("file"),
  20: _encodingError("UTF-8", "plain text files"),
  21: _viewDirectoryError("readfile", false),
  // 'del' command
  22: _enterParamError("a file/directory", "del never-gonna-let-you-down.txt"),
  23: _nonExistentError("file/directory"),
  24: _cancelledError("user"),
  25: _inUseError("file/directory"),
  26: _permissionError("delete the file/directory"),
  // 'taskkill' command
  27: _enterParamError("a PID to terminate", "taskkill 1234"),
  28: _containsInvalidCharactersError("PID", "numbers", "letters and special characters"),
  29: _permissionError("kill the process with PID"),
  // 'print' command
  30: "No text was provided to output.", // No need for a function, since this is a very simple error message and only used once
  // 'wcount' command
  31: _enterParamError("a file", "wcount file.txt"),
  32: _doesNotExistError("file"),
  33: _encodingError("UTF-8", "plain text files"),
  34: _viewDirectoryError("wcount", true),
  // 'help' command
  35: _unrecognizedCommandError(),
  // 'size' command
  36: _enterParamError("a file", "size test.bub"),
  37: _doesNotExistError("file"),
  38: _viewDirectoryError("size", false),
  // 'rename' command
  39: _enterParamError("the filename and what to call the file", "rename file.bub test.bub"),
  40: `You cannot rename a file/directory to the same name (${chalk.italic.bold("%VARIABLE%")}).`, // No need for a function, since this is only used once
  41: _nonExistentError("file"),
  42: _permissionError("rename the file/directory"),
  43: _inUseError("file"),
  // 'history' command
  44: `No history is available to display.`, // No need for a function, since this is a very simple error message and only used once
  45: _containsInvalidCharactersError("number", "a number", "letters and special characters"),
  46: `No command was found in history point ${chalk.italic.bold(
    "'%VARIABLE%'"
  )}. Try running ${chalk.italic("'history'")} to see all commands in history.`, // No need for a function, since this is only used once
  // 'fif' command
  47: _enterParamError("the filename/the phrase", "fif hello.bub world"),
  48: _doesNotExistError("file"),
  49: _viewDirectoryError("fif", false),
  50: _encodingError("UTF-8", "plain text files"),
  // 'ls' command (IDK why it is at the end, just forgot to add it earlier ¯\_(ツ)_/¯)
  51: _nonExistentError("directory"),
  // More 'size' command error messages :)
  52: `The 'sizes' flag must start with ${chalk.italic("'--sizes='")}.`, // No need for a function, since this is only used once, although it may be extracted later
  // 'ls' again!
  53: `The directory passed is not a directory.`,
};

module.exports = ERRORS;
