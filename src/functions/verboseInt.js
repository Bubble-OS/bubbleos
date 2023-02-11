const chalk = require("chalk");

const _verboseInterpret = (
  message,
  verbose,
  options = {
    variable: "",
    code: "",
    error: "",
  }
) => {
  if (verbose) {
    const date = new Date();
    const formattedDate = chalk.dim(
      `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}]`
    );

    const stringVars = {
      "%VARIABLE%": options.variable,
      "%CODE%": options.code,
      "%ERROR%": options.error,
    };

    for (let i = 0; i < Object.keys(stringVars).length; i++)
      message = message.replaceAll(Object.keys(stringVars)[i], Object.values(stringVars)[i]);

    console.log(
      chalk.yellow.bgBlack(`${chalk.dim(formattedDate)} ${chalk.bold("VERBOSE:")} ${message}`)
    );
  }
};

module.exports = _verboseInterpret;
