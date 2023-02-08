const chalk = require("chalk");
const readline = require("readline-sync");

const { copyFileSync } = require("fs");

const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");

const _errorInterpret = require("../functions/errorInt");
const _fatalError = require("../functions/fatalError");
const _verbInt = require("../functions/verboseInt");

const _verbMsgs = [
  `Replacing spaces in 'src' and 'dest'...`,
  `Checking if 'src'/'dest' is not provided...`,
  `Either 'src' or 'dest' is not provided (is 'undefined') (error code %ERROR%)!`,
  `There was an error, and the 'copyfile' command has been exited.`,
  `Removing starting and ending whitespace from 'src' and 'dest'...`,
  `Prompting for confirmation...`,
  `Checking if the operation was accepted or declined...`,
  `The operation was cancelled (error code %ERROR%)!`,
  `Operation accepted, continuing...`,
];

const copyfile = (src, dest, ...params) => {
  let verbose = false;
  if (
    params.includes("--verbose") ||
    params.includes("/verbose") ||
    src === "--verbose" ||
    src === "/verbose" ||
    dest === "--verbose" ||
    dest === "/verbose"
  )
    verbose = true;

  _verbInt(_verbMsgs[0], verbose);
  src = _replaceSpaces(src);
  dest = _replaceSpaces(dest);

  _verbInt(_verbMsgs[1], verbose);
  if (!src || !dest) {
    _verbInt(_verbMsgs[2], verbose, { error: 5 });
    _errorInterpret(5);
    _verbInt(_verbMsgs[3], verbose);
    return;
  }

  _verbInt(_verbMsgs[4], verbose);
  const srcPath = _convertAbsolute(src.trim());
  const destPath = _convertAbsolute(dest.trim());

  _verbInt(_verbMsgs[5], verbose);
  const confirmText = readline
    .question(
      `${chalk.bold.red("WARNING!")} If ${chalk.bold(
        destPath
      )} exists in the destination, it will be overwriten. Continue? [${chalk.green(
        "y"
      )}/${chalk.red.bold("N")}] `
    )
    .toLowerCase();
  _verbInt(_verbMsgs[6], verbose);
  if (confirmText.includes("n") || !confirmText.includes("y")) {
    _verbInt(_verbMsgs[7], verbose, { error: 6 });
    _errorInterpret(6);
    _verbInt(_verbMsgs[3], verbose);
    return;
  }
  _verbInt(_verbMsgs[8], verbose);

  try {
    console.log(chalk.italic.blueBright("Please wait...\n"));
    copyFileSync(srcPath, destPath);
  } catch (err) {
    if (err.code === "EPERM") {
      _errorInterpret(7, {
        variable: dest,
      });
    } else if (err.code === "ENOENT") {
      _errorInterpret(8, {
        variable: `${src} and/or ${dest}`,
      });
    } else {
      _fatalError(err);
    }
    return;
  }

  console.log(chalk.green("The operation completed successfully.\n"));
};

module.exports = copyfile;
