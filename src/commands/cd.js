const chalk = require("chalk");

const _replaceSpaces = require("../functions/replaceSpaces");
const _errorInterpret = require("../functions/errorInt");
const _fatalError = require("../functions/fatalError");
const _verbInt = require("../functions/verboseInt");

const verbMsgs = [
  `Replacing '/s' with spaces...`,
  `Checking if directory exists (not possible if running with '--verbose')...`,
  `Check complete, continuing...`,
  `Changing directory to '%VARIABLE%'...`,
  `The directory '%VARIABLE%' does not exist (error code '%ERROR%')!`,
  `The directory '%VARIABLE%' is not readable by the current user account (error code '%ERROR%')!`,
  `An unknown fatal error has occurred (technical error code %ERROR%)!`,
  `There was an error, and the 'cd' command has been exited.\n`,
  `Successfully changed the directory to '%VARIABLE%'!\n`,
];

const cd = (dir, ...params) => {
  let verbose = false;
  if (params.includes("--verbose")) verbose = true;

  _verbInt(verbMsgs[0], verbose);
  dir = _replaceSpaces(dir);

  _verbInt(verbMsgs[1], verbose);
  if (typeof dir === "undefined") {
    _errorInterpret(2);
    return;
  }
  _verbInt(verbMsgs[2], verbose);

  try {
    _verbInt(verbMsgs[3], verbose, { variable: dir });
    process.chdir(dir);
  } catch (err) {
    if (err.code === "ENOENT") {
      _verbInt(verbMsgs[4], verbose, { variable: dir, error: 3 });
      _errorInterpret(3, { variable: dir });
    } else if (err.code === "EPERM") {
      _verbInt(verbMsgs[5], verbose, { variable: dir, error: 4 });
      _errorInterpret(4, { variable: dir });
    } else {
      _verbInt(verbMsgs[6], verbose, { variable: dir, error: err.code });
      _fatalError(err);
    }

    _verbInt(verbMsgs[7], verbose, { variable: dir, error: err.code });
    return;
  }

  console.log(`Changed directory to ${chalk.green(process.cwd())}.\n`);
  _verbInt(verbMsgs[8], verbose, { variable: dir });
};

module.exports = cd;
