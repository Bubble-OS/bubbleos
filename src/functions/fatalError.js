const chalk = require("chalk");

const _fatalError = (err) => {
  const restRedBg = chalk.bgRed(" ").repeat(process.stdout.columns);

  console.log(`${chalk.bgRed.bold.underline("!!! FATAL ERROR !!!")}\n`);
  console.log(
    `${chalk.red.bold(
      `A fatal error has occured which caused BubbleOS to crash. To make sure the OS does not get damaged, BubbleOS has been exited (with status code 1).`
    )}\n\n${chalk.red.bold(
      `Make sure that the arguments passed are correct. Also, you can make a new GitHub Issue on the project's repo (find by running ${chalk.italic(
        "about"
      )}) to inform the developer of the issue.`
    )}\n${chalk.red.bold(
      `To attempt to resolve this issue yourself, try running the same command with the ${chalk.italic(
        "--verbose"
      )} flag to see in detail what and when the error occurs.`
    )}\n`
  );
  console.log(`${chalk.red.bold.dim.underline("Technical Error Information")}\n`);
  console.log(
    `${chalk.red.bold.dim(
      `Message: ${err.message}\nTechnical error number: ${err.errno}\nTechnical error code: ${err.code}\nSystem call: ${err.syscall}`
    )}\n`
  );

  process.exit(1);
};

module.exports = _fatalError;
