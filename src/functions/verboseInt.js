const chalk = require("chalk");

const _verboseInterpret = (message, verbose) => {
  if (verbose) {
    const date = new Date();
    const formattedDate = chalk.dim(
      `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}]`
    );

    console.log(
      chalk.yellow.bgBlack(`${chalk.dim(formattedDate)} ${chalk.bold("VERBOSE:")} ${message}`)
    );
  }
};

module.exports = _verboseInterpret;
