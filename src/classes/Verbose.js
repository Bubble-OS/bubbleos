const chalk = require("chalk");

class Verbose {
  constructor(isVerbose) {
    this.isVerbose = isVerbose;
  }

  #formVerbMsg(message) {
    const date = new Date();
    const formattedDate = chalk.dim(
      `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}]`
    );

    console.log(
      chalk.yellow.bgBlack(`${chalk.dim(formattedDate)} ${chalk.bold("VERBOSE:")} ${message}`)
    );
  }

  startCmd(command) {
    if (this.isVerbose)
      this.#formVerbMsg(
        `Starting up function ${chalk.italic(`'${command}'`)} and initializing verbose state...`
      );
  }

  chkUndefined(variable) {
    if (this.isVerbose)
      this.#formVerbMsg(
        `Checking if variable ${chalk.bold.italic(`'${variable}'`)} is ${chalk.italic(
          "'undefined'"
        )} or ${chalk.italic("--verbose")}/${chalk.italic("/verbose")}...`
      );
  }

  enterParam() {
    if (this.isVerbose)
      this.#formVerbMsg(
        `${chalk.bold.underline("ERROR!")} The parameter is either ${chalk.italic(
          `'undefined'`
        )} or ${chalk.italic("--verbose")}/${chalk.italic("/verbose")}.`
      );
  }

  wasError(command, withNewline = true) {
    if (this.isVerbose)
      this.#formVerbMsg(
        `An error occurred, and the ${chalk.italic(`'${command}'`)} command has been terminated.${
          withNewline ? "\n" : ""
        }`
      );
  }

  chkComplete() {
    if (this.isVerbose) this.#formVerbMsg(`The check has been completed, continuing...`);
  }

  replaceSpacesAndConvAbs(variable) {
    if (this.isVerbose)
      this.#formVerbMsg(
        `Replacing spaces in ${chalk.bold.italic(
          `'${variable}'`
        )} and coverting it to an absolute path...`
      );
  }

  attemptTo(todo, variable) {
    if (this.isVerbose)
      this.#formVerbMsg(`Attempting to ${todo} ${chalk.bold.italic(`'${variable}'`)}...`);
  }

  chkExistant(variable) {
    if (this.isVerbose)
      this.#formVerbMsg(`Checking if the path ${chalk.bold.italic(`'${variable}'`)} exists...`);
  }

  nonExistant(variable) {
    if (this.isVerbose)
      this.#formVerbMsg(
        `${chalk.bold.underline("ERROR!")} The path, ${chalk.bold.italic(
          `'${variable}'`
        )}, does not exist.`
      );
  }

  permsErr(variable) {
    if (this.isVerbose)
      this.#formVerbMsg(
        `${chalk.bold.underline(
          "ERROR!"
        )} A permission error occurred with the file ${chalk.bold.italic(`'${variable}'`)}.`
      );
  }

  operationSuccess(command, withNewline = true) {
    if (this.isVerbose)
      this.#formVerbMsg(
        `The command, ${chalk.italic(`'${command}'`)}, has executed successfully!${
          withNewline ? "\n" : ""
        }`
      );
  }
}

module.exports = Verbose;
