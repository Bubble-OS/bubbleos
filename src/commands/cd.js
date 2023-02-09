import chalk from "chalk";

import _replaceSpaces from "../functions/replaceSpaces.js";
import _errorInterpret from "../functions/errorInt.js";
import _fatalError from "../functions/fatalError.js";
import _verbInt from "../functions/verboseInt.js";

const _verbMsgs = [
  `Replacing '/s' with spaces...`,
  `Checking if directory exists...`,
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
  if (params.includes("--verbose") || params.includes("/verbose")) verbose = true;

  _verbInt(_verbMsgs[0], verbose);
  dir = _replaceSpaces(dir);

  _verbInt(_verbMsgs[1], verbose);
  if (typeof dir === "undefined") {
    _errorInterpret(2, { type: "a directory", example: "cd test" });
    return;
  }
  _verbInt(_verbMsgs[2], verbose);

  try {
    _verbInt(_verbMsgs[3], verbose, { variable: dir });
    process.chdir(dir);
  } catch (err) {
    if (err.code === "ENOENT") {
      _verbInt(_verbMsgs[4], verbose, { variable: dir, error: 3 });
      _errorInterpret(3, { type: "directory", variable: dir });
    } else if (err.code === "EPERM") {
      _verbInt(_verbMsgs[5], verbose, { variable: dir, error: 4 });
      _errorInterpret(4, { todo: "change into the directory", variable: dir });
    } else {
      _verbInt(_verbMsgs[6], verbose, { error: err.code });
      _fatalError(err);
    }

    _verbInt(_verbMsgs[7], verbose, { variable: dir, error: err.code });
    return;
  }

  console.log(`Changed directory to ${chalk.green(process.cwd())}.\n`);
  _verbInt(_verbMsgs[8], verbose, { variable: dir });
};

export default cd;
