const chalk = require("chalk");

const _errorInterpret = require("../functions/errorInt");
const _verboseInterpret = require("../functions/verboseInt");

const cd = (dir, verbose = false) => {
  _verboseInterpret(
    `In ${chalk.italic("'cd'")} function; beginning ${chalk.italic("'cd'")} function...`,
    verbose
  );
  _verboseInterpret(`Checking if directory is invalid...`, verbose);

  if (dir === "") {
    _verboseInterpret(
      `Directory is empty (check ${chalk.italic('dir === ""')} returned ${chalk.italic(
        "true"
      )}); error code of ${chalk.bold("0x0002")} was received; exiting...`,
      verbose
    );
    _errorInterpret("0x0002");
    return;
  }

  _verboseInterpret(
    `Directory passed is not empty (back to main function body), continuing...`,
    verbose
  );

  try {
    _verboseInterpret(
      `Attempting to change the CWD into ${chalk.bold.italic("'dir'")}...`,
      verbose
    );
    process.chdir(dir);
  } catch (err) {
    if (err.code === "ENOENT") {
      _verboseInterpret(
        `Directory is empty (check ${chalk.italic('err.code === "ENOENT"')} returned ${chalk.italic(
          "true"
        )}); error code of ${chalk.bold("0x0003")} with status message ${chalk.bold(
          "ENOENT"
        )} (non-existent error) was received; exiting...`,
        verbose
      );
      _errorInterpret("0x0003", { variable: dir });
    } else if (err.code === "EPERM") {
      _verboseInterpret(
        `Invalid permissions to change into directory (check ${chalk.italic(
          'err.code === "EPERM"'
        )} returned ${chalk.italic("true")}); error code of ${chalk.bold(
          "0x0004"
        )} with status message ${chalk.bold("EPERM")} (permission error) was received; exiting...`,
        verbose
      );
      _errorInterpret("0x0004", { variable: dir });
    } else {
      _verboseInterpret(
        `Unknown error occurred; error code of ${chalk.bold(
          "0x0005"
        )} with status message ${chalk.bold(err.code)} was received; exiting...`,
        verbose
      );
      _errorInterpret("0x0005", {
        variable: dir,
        wordCode: err.code,
      });
    }

    _verboseInterpret(
      `An error (${chalk.bold(err.code)}) occurred which caused ${chalk.italic(
        "'cd'"
      )} to finish prematurely; exiting...\n`,
      verbose
    );
    return;
  }

  _verboseInterpret(`Successfully changed into ${chalk.italic(dir)} with no errors`, verbose);

  console.log(`Changed directory to ${chalk.green(process.cwd())}.\n`);

  _verboseInterpret(
    `Function ${chalk.italic("'cd'")} has finished executing successfully, completing...\n`,
    verbose
  );
};

module.exports = cd;
