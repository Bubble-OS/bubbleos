const { writeHeapSnapshot } = require("v8");
const fs = require("fs");

const chalk = require("chalk");

const { GLOBAL_NAME } = require("../variables/aboutConsts");

/**
 * End BubbleOS with a fatal exception with exit code `1`.
 *
 * @param {Error} err The error.
 */
const _fatalError = (err, doFileDump = true) => {
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
      `A fatal error has occurred which has caused ${GLOBAL_NAME} to crash. To make sure the OS does not get damaged, ${GLOBAL_NAME} has been exited (with exit code ${chalk.italic(
        "'1'"
      )}).`
    )}\n\n${chalk.red.bold(
      `Make sure that the arguments passed are correct. Also, you can make a new Github Issue on the project's repository (find by running ${chalk.italic(
        "'about'"
      )}) to inform the developer of the issue.`
    )}\n${chalk.red.bold(
      `To attempt to resolve this issue yourself, use the ${chalk.italic(
        "'help'"
      )} command to see the correct way to use the command.`
    )}\n`
  );

  console.log(`${chalk.red.dim.underline("Technical Error Information\n")}`);
  for (let error in errProperties) {
    if (typeof errProperties[error] !== "undefined")
      console.log(chalk.red.dim(`${chalk.italic(error)}: ${errProperties[error]}`));
  }

  console.log();

  if (doFileDump) {
    try {
      console.log(chalk.underline("File Dump Status"));

      const FILENAMES = {
        errorInfo: `${GLOBAL_NAME}_error_info.txt`.toUpperCase(),
        heapSnap: `${GLOBAL_NAME}_heap_snapshot.txt`.toUpperCase(),
      };

      let errorArr = [];

      for (let error in errProperties) {
        if (typeof errProperties[error] !== "undefined")
          errorArr.push(`${error}: ${errProperties[error]}`);
      }

      const date = new Date();
      const errorInfoTxt = `BubbleOS encountered a fatal error at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} on ${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}.\nGive the developer this information by running 'about' in ${GLOBAL_NAME} and going to the Github page, then the Issues tab, and creating a new issue with the text below. Thanks for helping!\n\n${errorArr.join(
        "\n"
      )}`;

      fs.writeFileSync(FILENAMES.errorInfo, errorInfoTxt);
      writeHeapSnapshot(FILENAMES.heapSnap);

      console.log(
        chalk.green(
          `${chalk.white.bgGreen(" SUCCESS ")}: Saved files ${chalk.bold(
            FILENAMES.errorInfo
          )} and ${chalk.bold(FILENAMES.heapSnap)} in ${chalk.bold(process.cwd())}.\n`
        )
      );
    } catch (saveErr) {
      console.log(
        chalk.red(
          `${chalk.white.bgRed(" ERROR ")}: Could not save files ${chalk.bold(
            FILENAMES.errorInfo
          )} and ${chalk.bold(FILENAMES.heapSnap)} in ${chalk.bold(process.cwd())}.`
        )
      );
    }
  }

  console.log(`${chalk.underline("Memory Dump")}`);
  process.abort();
};

module.exports = _fatalError;
