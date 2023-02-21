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
        `Starting up function ${chalk.bold.italic(
          `'${command}'`
        )} and initializing verbose state...`
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
}

module.exports = Verbose;
