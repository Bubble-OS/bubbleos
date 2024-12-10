// IMPORTANT MESSAGE!!!
// This class in unused in BubbleOS build 100, as the
// verbose feature has not been implemented yet.

const chalk = require("chalk");

const _detectArgs = require("../functions/detectArgs");

const { GLOBAL_NAME } = require("../variables/constants");

/**
 * Class to print verbose messages.
 *
 * The existing verbose pre-made messages are below. To make a custom message, use `Verbose.custom()`.
 *
 * - _I'll do it soon_
 */
class Verbose {
  constructor() {}

  // Also used for other functions in this class. The name is misleading,
  // as it is also used outside this class for custom messages, hence the name.
  static custom(message) {
    const date = new Date();
    const formattedDate = chalk.dim(
      `[${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(
        2,
        "0"
      )}:${String(date.getSeconds()).padStart(2, "0")}:${String(date.getMilliseconds()).padStart(
        3,
        "0"
      )}]`
    );

    if (_detectArgs("verbose"))
      console.log(chalk.yellow(`${formattedDate} ${chalk.bgBlack.bold(" VERBOSE: ")} ${message}`));
  }

  static initArgs() {
    this.custom("Initializing arguments...");
  }

  static parseQuotes() {
    this.custom("Parsing double quotes for paths with spaces...");
  }

  static pathAbsolute(path) {
    this.custom(`Convering path '${chalk.italic(path)}' to an absolute path...`);
  }

  static initChecker() {
    this.custom("Initializing checker...");
  }

  static chkEmpty() {
    this.custom(`One or more arguments were detected to be empty...`);
  }

  static chkExists(variable) {
    this.custom(`Path '${chalk.italic(variable)}' was detected to not exist...`);
  }

  /**
   *
   * @param {string} variable The path.
   * @param {"file" | "directory"} type The type that was expected (e.g. expected file).
   */
  static chkType(variable, type) {
    this.custom(
      `Path '${chalk.italic(variable)}' was detected to be a ${
        type.toLowerCase() === "file" ? "directory" : "file"
      }; expected ${type}.`
    );
  }

  static chkEncoding() {
    this.custom("Path was detected to have invalid encoding.");
  }

  static fatalError() {
    this.custom("Unhandled exception, throwing fatal error...");
  }

  static exitProcess(code = 0) {
    this.custom(`Exiting ${GLOBAL_NAME} process with status code ${code}...`);
  }

  static permError() {
    this.custom("Encountered a permission error while trying to access path.");
  }

  static inUseError() {
    this.custom("Encountered an error, due to the path being used by another program.");
  }

  static promptUser() {
    this.custom("Prompting for user confirmation...");
  }

  static declinePrompt() {
    this.custom("User did not accept, aborting process...");
  }
}

module.exports = Verbose;
