// Get modules
const { writeHeapSnapshot } = require("v8");
const fs = require("fs");
const chalk = require("chalk");

// Get variables
const { GLOBAL_NAME } = require("../variables/constants");

// Get functions
const _friendlyOS = require("./friendlyOS");

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

  // Beep
  process.stdout.write("\u0007");

  // Log information about the crash and what the user should do
  console.log(`${chalk.bgRed.bold.underline("!!! FATAL ERROR !!!")}\n`);
  console.log(
    `${chalk.red.bold(
      `A fatal exception has occurred in ${GLOBAL_NAME}. To avoid damage to ${GLOBAL_NAME} and ${_friendlyOS()}, ${GLOBAL_NAME} has been aborted with a failure status.`
    )}\n\n${chalk.red.bold(
      `Make sure that your system supports ${GLOBAL_NAME}. Also, if running a command caused this screen to appear, run '${chalk.italic(
        "help <command>"
      )}' to get detailed information for how to use your respective command.`
    )}\n${chalk.red.bold(
      `If none of these options help, there may be a bug in ${GLOBAL_NAME}. In that case, report the bug on the project's GitHub page (https://github.com/Bubble-OS/bubbleos/issues/new).`
    )}\n`
  );

  // Technical error information subheading
  console.log(`${chalk.red.dim.underline("Technical Error Information\n")}`);

  // Log the PID
  console.log(chalk.red.dim(`${chalk.italic(`${GLOBAL_NAME} PID`)}: ${process.pid}`));

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
      const errorInfoTxt = `BubbleOS encountered a fatal error at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} on ${
        date.getMonth() + 1
      }/${date.getDate()}/${date.getFullYear()}.\nGive the developer this information by going to https://github.com/Bubble-OS/bubbleos/issues/new (GitHub account required). Thanks for helping!\n\n${errorArr.join(
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
