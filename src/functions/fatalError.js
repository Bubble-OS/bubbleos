const fs = require("fs");
const chalk = require("chalk");
const { question } = require("readline-sync");

const { GLOBAL_NAME, SHORT_NAME } = require("../variables/constants");

const _friendlyOS = require("./friendlyOS");

const InfoMessages = require("../classes/InfoMessages");

/**
 * The name of the file to store the error message in.
 */
const ERROR_INFO_FILENAME = `${SHORT_NAME}_error_info.txt`.toUpperCase();

/**
 * End BubbleOS with a fatal exception with exit code `1`.
 *
 * Usage:
 *
 * ```js
 * try {
 *   throw new Error();
 * } catch (err) {
 *   _fatalError(err);
 * }
 * ```
 *
 * @param {Error} err The error that caused the fatal error.
 * @param {boolean} doFileDump Whether or not to save a file containing error info. Defaults to `true`.
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

  // Beep
  process.stdout.write("\u0007");

  console.log(`${chalk.bgRed.bold.underline("!!! FATAL ERROR !!!")}\n`);
  console.log(
    `${chalk.red.bold(
      `A fatal exception has occurred in ${GLOBAL_NAME}. To avoid damage to ${GLOBAL_NAME} and ${_friendlyOS()}, ${GLOBAL_NAME} has been aborted with a failure status.`
    )}\n\n${chalk.red.bold(
      `Make sure that your system supports ${GLOBAL_NAME}. If your system is supported, there may be a bug in ${GLOBAL_NAME}.\nIn that case, report the bug on the project's GitHub page (https://github.com/arnavt78/bubbleos/issues/new).`
    )}\n`
  );

  console.log(`${chalk.red.dim.underline("Technical Error Information\n")}`);

  console.log(chalk.red.dim(`${chalk.italic(`${GLOBAL_NAME} PID`)}: ${process.pid}`));

  for (let error in errProperties) {
    if (typeof errProperties[error] !== "undefined")
      console.log(chalk.red.dim(`${chalk.italic(error)}: ${errProperties[error]}`));
  }

  console.log();

  if (doFileDump) {
    try {
      let errorArr = [];

      for (let error in errProperties) {
        if (typeof errProperties[error] !== "undefined")
          errorArr.push(`${error}: ${errProperties[error]}`);
      }

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

      fs.writeFileSync(ERROR_INFO_FILENAME, errorInfoTxt);

      InfoMessages.success(
        `Saved file ${chalk.bold(ERROR_INFO_FILENAME)} in ${chalk.bold(process.cwd())}.`
      );
    } catch (saveErr) {
      InfoMessages.error(
        `Could not save file ${chalk.bold(ERROR_INFO_FILENAME)} in ${chalk.bold(process.cwd())}.`
      );
    }
  }

  question(chalk.red("Press the Enter key to continue . . . "), { hideEchoBack: true, mask: "" });

  console.log(`${chalk.bold(`\nTerminating ${GLOBAL_NAME} process...\n`)}`);
  process.exit(1);
};

module.exports = _fatalError;
