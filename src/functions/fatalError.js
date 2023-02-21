const chalk = require("chalk");

const { GLOBAL_NAME } = require("../variables/aboutConsts");

/**
 * End BubbleOS with a fatal exception with exit code `1`.
 *
 * @param {Error} err The error.
 */
const _fatalError = (err) => {
  const errProperties = {
    // For 'Error':
    Code: err?.code,
    Message: err?.message,
    "Stack trace": err?.stack,
    // For 'SystemError':
    Address: err?.address,
    Destination: err?.dest,
    "Error number": err?.errno,
    Information: err?.info,
    Path: err?.path,
    Port: err?.port,
    "System call": err?.syscall,
  };

  console.log(`${chalk.bgRed.bold.underline("!!! FATAL ERROR !!!")}\n`);
  console.log(
    `${chalk.red.bold(
      `A fatal error has occured which caused ${GLOBAL_NAME} to crash. To make sure the OS does not get damaged, ${GLOBAL_NAME} has been exited (with failure code ${chalk.italic(
        "'1'"
      )}).`
    )}\n\n${chalk.red.bold(
      `Make sure that the arguments passed are correct. Also, you can make a new GitHub Issue on the project's repository (find by running ${chalk.italic(
        "'about'"
      )}) to inform the developer of the issue.`
    )}\n${chalk.red.bold(
      `To attempt to resolve this issue yourself, try running the same command with the ${chalk.italic(
        "'--verbose'"
      )} flag to see in detail what and when the error occurs.`
    )}\n`
  );

  console.log(`${chalk.red.dim.underline("Technical Error Information\n")}`);
  for (let error in errProperties) {
    if (typeof errProperties[error] !== "undefined")
      console.log(chalk.red.dim(`${chalk.italic(error)}: ${errProperties[error]}`));
  }

  console.log();

  console.log(`${chalk.underline("Memory Dump")}`);
  process.abort();
};

module.exports = _fatalError;
