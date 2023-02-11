import chalk from "chalk";

const ERRORS = {
  0: `Please enter a command. Type ${chalk.italic("'help'")} for a list of available commands.`,
  1: `The command, ${chalk.italic.bold("'%COMMAND%'")}, is unrecognized. Type ${chalk.italic(
    "'help'"
  )} for a list of available commands.`,
  2: `You must enter %TYPE%. For example, enter it like ${chalk.italic.bold(`'%EXAMPLE%'`)}.`,
  3: `The %TYPE%, '${chalk.italic.bold("%VARIABLE%")}', does not exist.`,
  4: `You do not have permission to %TODO% ${chalk.italic.bold("'%VARIABLE%'")}. Access is denied.`,
  5: `This command only works on %OS%.`,
  6: `The %TYPE%, ${chalk.bold.italic("'%VARIABLE%'")}, already exists.`,
  7: `The %TYPE%, ${chalk.bold.italic("'%VARIABLE%'")}, is currently being used.`,
  8: `Cannot read any files other than ones encoded in %ENCODING%.`,
  9: `Viewing directories using the ${chalk.bold.italic(`'%COMMAND%'`)} command is not supported.`,
  10: `The %TYPE% can only contain %SUPPOSED_TO% and not contain %NOT_CONTAIN% (received ${chalk.bold.italic(
    "'%VARIABLE%'"
  )}).`,
};

export default ERRORS;
