// Get modules
const { writeHeapSnapshot } = require("v8");
const fs = require("fs");
const chalk = require("chalk");

// Get variables
const { GLOBAL_NAME } = require("../variables/constants");

/**
 * End BubbleOS with a fatal exception with exit code `1`.
 *
 * Usage:
 *
 * ```js
 * try {
 *   // Some code here...
 * } catch (err) {
 *   // An error occurred!
 *   _fatalError(err);
 * }
 * ```
 *
 * @param {Error} err The error that caused the fatal error.
 */
const _fatalError = (err, doFileDump = !global.noDump) => {
  // A friendly version of the technical error information
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

  // Log information about the crash and what the user should do
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

  // Technical error information subheading
  console.log(`${chalk.red.dim.underline("Technical Error Information\n")}`);

  // Loop through the error properties
  for (let error in errProperties) {
    // If the error is defined, log the respective error
    if (typeof errProperties[error] !== "undefined")
      console.log(chalk.red.dim(`${chalk.italic(error)}: ${errProperties[error]}`));
  }

  // Log a newline
  console.log();

  // If the error was passed with a file dump request
  if (doFileDump) {
    try {
      // Subheading
      console.log(chalk.underline("File Dump Status"));

      // Filenames for each error; change them here
      const FILENAMES = {
        errorInfo: `${GLOBAL_NAME}_error_info.txt`.toUpperCase(),
        heapSnap: `${GLOBAL_NAME}_heap_snapshot.txt`.toUpperCase(),
      };

      // All error properties stored in an array
      let errorArr = [];

      // Loop through the errors
      for (let error in errProperties) {
        // And if it is defined, add it to the error array
        if (typeof errProperties[error] !== "undefined")
          errorArr.push(`${error}: ${errProperties[error]}`);
      }

      // Add some information to the beginning of the error information file
      const date = new Date();
      const errorInfoTxt = `BubbleOS encountered a fatal error at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} on ${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}.\nGive the developer this information by running 'about' in ${GLOBAL_NAME} and going to the Github page, then the Issues tab, and creating a new issue with the text below. Thanks for helping!\n\n${errorArr.join(
        "\n"
      )}`;

      // Make the two files
      fs.writeFileSync(FILENAMES.errorInfo, errorInfoTxt);
      writeHeapSnapshot(FILENAMES.heapSnap);

      // If the operation succeeded, show a success message
      console.log(
        chalk.green(
          `${chalk.white.bgGreen(" SUCCESS ")}: Saved files ${chalk.bold(
            FILENAMES.errorInfo
          )} and ${chalk.bold(FILENAMES.heapSnap)} in ${chalk.bold(process.cwd())}.\n`
        )
      );
    } catch (saveErr) {
      // If an error occurred, show an error message, but continue
      console.log(
        chalk.red(
          `${chalk.white.bgRed(" ERROR ")}: Could not save files ${chalk.bold(
            FILENAMES.errorInfo
          )} and ${chalk.bold(FILENAMES.heapSnap)} in ${chalk.bold(process.cwd())}.`
        )
      );
    }
  }

  // Memory dump
  console.log(`${chalk.underline("Memory Dump")}`);
  // Aborting the Node.js process will cause a memory dump
  process.abort();
};

// Export the function
module.exports = _fatalError;
