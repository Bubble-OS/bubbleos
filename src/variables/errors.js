const chalk = require("chalk");

/**
 * @deprecated As of `v0.6.6`, this variable is deprecated. Use the new `Errors` class instead.
 */
const ERRORS = {
  0: `Please enter a command. Type ${chalk.italic("'help'")} for a list of available commands.`, // Done!
  1: `The command, ${chalk.italic.bold("'%COMMAND%'")}, is unrecognized. Type ${chalk.italic(
    "'help'"
  )} for a list of available commands.`, // Done!
  2: `You must enter %TYPE%. For example, enter it like ${chalk.italic.bold(`'%EXAMPLE%'`)}.`, // Done!
  3: `The %TYPE%, ${chalk.italic.bold(
    "'%VARIABLE%'"
  )}, does not exist in the file system ${chalk.dim.italic("(ENOENT)")}.`, // Done!
  4: `You do not have permission to %TODO% ${chalk.italic.bold(
    "'%VARIABLE%'"
  )}. You need elevated privileges ${chalk.dim.italic("(EPERM)")}.`, // Done!
  5: `This command only works on %OS%.`, // Done!
  6: `The %TYPE%, ${chalk.bold.italic("'%VARIABLE%'")}, already exists ${chalk.dim.italic(
    "(EEXIST)"
  )}.`, // Done!
  7: `The %TYPE%, ${chalk.bold.italic("'%VARIABLE%'")}, is currently being used ${chalk.dim.italic(
    "(EBUSY)"
  )}.`, // Done!
  8: `Cannot read any files other than ones encoded in %ENCODING%.`, // Done!
  9: `The ${chalk.bold.italic(
    `'%COMMAND%'`
  )} command expected a file, but got a directory ${chalk.dim.italic("(EISDIR)")}.`, // Done!
  10: `The %TYPE% can only contain %SUPPOSED_TO% and not contain %NOT_CONTAIN% (received ${chalk.bold.italic(
    "'%VARIABLE%'"
  )}).`, // Done!
  11: `The ${chalk.bold.italic(
    `'%COMMAND%'`
  )} command expected a directory, but got a file ${chalk.dim.italic("(ENOTDIR)")}.`, // Done!
  12: `The directory, ${chalk.bold.italic("'%VARIABLE%'")}, is not empty ${chalk.italic.bold(
    "(ENOTEMPTY)"
  )}`,
  13: `An attempt was made to access ${chalk.bold.italic(
    "'%VARIABLE%'"
  )}, which is forbidden by its permissions ${chalk.dim.italic("(EACCES)")}.`,
  14: `There are too many files open in the system. Close at least one to continue ${chalk.dim.italic(
    "(EMFILE)"
  )}.`,
  15: `The %TYPE% cannot be the same name. Please choose a different name.`,
  16: `The %TYPE% can only end in the ${chalk.italic("'%EXTENTION%'")} file extention.`, // Done!
};

module.exports = ERRORS;
