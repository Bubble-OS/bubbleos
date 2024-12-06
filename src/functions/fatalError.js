// Get modules
const fs = require("fs");
const chalk = require("chalk");
const { question } = require("readline-sync");

// Get variables
const { GLOBAL_NAME } = require("../variables/constants");

// Get functions
const _friendlyOS = require("./friendlyOS");

/**
 * The name of the file to store the error message in.
 */
const ERROR_INFO_FILENAME = `${GLOBAL_NAME}_error_info.txt`.toUpperCase();

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
const _fatalError = (err, doFileDump = !globalThis.noDump) => {
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
      `Make sure that your system supports ${GLOBAL_NAME}. If your system is supported, there may be a bug in ${GLOBAL_NAME}.\nIn that case, report the bug on the project's GitHub page (https://github.com/arnavt78/bubbleos/issues/new).`
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
      const errorInfoTxt = `BubbleOS encountered a fatal error at ${String(
        date.getHours()
      )}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(
        2,
        "0"
      )} on ${
        date.getMonth() + 1
      }/${date.getDate()}/${date.getFullYear()}.\nGive the developer this information by going to https://github.com/arnavt78/bubbleos/issues/new (GitHub account required).\n\n${errorArr.join(
        "\n"
      )}`;

      // Make the file
      fs.writeFileSync(ERROR_INFO_FILENAME, errorInfoTxt);

      // If the operation succeeded, show a success message
      console.log(
        chalk.green(
          `${chalk.white.bgGreen(" SUCCESS ")} Saved file ${chalk.bold(
            ERROR_INFO_FILENAME
          )} in ${chalk.bold(process.cwd())}.\n`
        )
      );
    } catch (saveErr) {
      // If an error occurred, show an error message, but continue
      console.log(
        chalk.red(
          `${chalk.white.bgRed(" ERROR: ")} Could not save file ${chalk.bold(
            ERROR_INFO_FILENAME
          )} in ${chalk.bold(process.cwd())}.\n`
        )
      );
    }
  }

  question(chalk.red("Press the Enter key to continue . . . "), { hideEchoBack: true, mask: "" });

  console.log(`${chalk.bold(`\nTerminating ${GLOBAL_NAME} process...\n`)}`);
  process.exit(1);
};

// Export the function
module.exports = _fatalError;
