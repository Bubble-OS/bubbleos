// IMPORTANT MESSAGE!!!
// This class in unused in BubbleOS build 100, as the
// verbose feature has not been implemented yet.

const chalk = require("chalk");

const _detectArgs = require("../functions/detectArgs");

/**
 * Class to print verbose messages.
 *
 * The existing verbose pre-made messages are below. To make a custom message, use `Verbose.custom()`.
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

    // THIS WILL BE INTRODUCED IN THE NEXT BUILD!
    // if (_detectArgs("verbose"))
    //   console.log(chalk.yellow(`${formattedDate} ${chalk.bgBlack.bold(" VERBOSE: ")} ${message}`));
  }

  static initArgs() {
    this.custom("Initializing arguments...");
  }

  static parseQuotes() {
    this.custom("Parsing double quotes for paths with spaces...");
  }

  static initChecker() {
    this.custom("Initializing checker...");
  }

  static chkEmpty(variable) {
    this.custom(`Checking if variable '${chalk.italic(variable)}' is empty...`);
  }

  static chkExists(variable) {
    this.custom(`Checking if the path '${chalk.italic(variable)}' exists...`);
  }

  static startCmd(command) {
    this.custom(
      `Starting up function ${chalk.italic(`'${command}'`)} and initializing verbose state...`
    );
  }

  static chkUndefined(variable) {
    this.custom(
      `Checking if variable ${chalk.bold.italic(`'${variable}'`)} is ${chalk.italic(
        "'undefined'"
      )} or ${chalk.italic("--verbose")}/${chalk.italic("/verbose")}...`
    );
  }

  static enterParam() {
    this.custom(
      `${chalk.bold.underline("ERROR!")} The parameter is either ${chalk.italic(
        `'undefined'`
      )} or ${chalk.italic("--verbose")}/${chalk.italic("/verbose")}.`
    );
  }

  static wasError(command, withNewline = true) {
    this.custom(
      `An error occurred, and the ${chalk.italic(`'${command}'`)} command has been terminated.${
        withNewline ? "\n" : ""
      }`
    );
  }

  static chkComplete() {
    this.custom(`The check has been completed, continuing...`);
  }

  static replaceSpacesAndConvAbs(variable) {
    this.custom(
      `Replacing spaces in ${chalk.bold.italic(
        `'${variable}'`
      )} and converting it to an absolute path...`
    );
  }

  static attemptTo(todo, variable) {
    this.custom(`Attempting to ${todo} ${chalk.bold.italic(`'${variable}'`)}...`);
  }

  static chkExistant(variable) {
    this.custom(`Checking if the path ${chalk.bold.italic(`'${variable}'`)} exists...`);
  }

  static nonExistant(variable) {
    this.custom(
      `${chalk.bold.underline("ERROR!")} The path, ${chalk.bold.italic(
        `'${variable}'`
      )}, does not exist.`
    );
  }

  static operationSuccess(command, withNewline = true) {
    this.custom(
      `The command, ${chalk.italic(`'${command}'`)}, has executed successfully!${
        withNewline ? "\n" : ""
      }`
    );
  }

  static intParams() {
    this.custom("Interpreting parameters/arguments...");
  }
}

module.exports = Verbose;
