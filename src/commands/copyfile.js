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
  `Either 'src' or 'dest' is not provided (is 'undefined') (error code '%ERROR%')!`,
  `There was an error, and the 'copyfile' command has been exited.`,
  `Removing starting and ending whitespace from 'src' and 'dest'...`,
  `Prompting for confirmation...`,
  `Checking if the operation was accepted or declined...`,
  `The operation was cancelled (error code %ERROR%)!`,
  `Operation accepted, continuing...`,
  `Attempting to copy file %VARIABLE%...`,
  `The source file (or destination directory) does not have read/write permissions (%VARIABLE%) (error code '%ERROR%')!`,
  `The source file, '%VARIABLE%', does not exist (error code '%ERROR%')!`,
  `An unknown fatal error has occurred (technical error code %ERROR%)!`,
  `There was an error, and the 'copyfile' command has been exited.\n`,
  `Successfully changed the directory to '%VARIABLE%'!\n`,
];

const copyfile = (src, dest, ...params) => {
  let verbose = false;
  if (
    params.includes("--verbose") ||
    params.includes("/verbose") ||
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
    _errorInterpret(2, {
      type: "the source and destination",
      example: "copyfile test.txt D:\\test.txt",
    });
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
    console.log(chalk.yellow("Operation cancelled.\n"));
    _verbInt(_verbMsgs[3], verbose);
    return;
  }
  _verbInt(_verbMsgs[8], verbose);

  try {
    console.log(chalk.italic.blueBright("Please wait...\n"));
    _verbInt(_verbMsgs[9], verbose, { variable: `${srcPath} to ${destPath}` });
    copyFileSync(srcPath, destPath);
  } catch (err) {
    if (err.code === "EPERM") {
      _verbInt(_verbMsgs[10], verbose, { variable: `${srcPath} and/or ${destPath}`, error: 7 });
      _errorInterpret(4, { todo: "read/write to", variable: `${srcPath} and/or ${destPath}` });
    } else if (err.code === "ENOENT") {
      _verbInt(_verbMsgs[11], verbose, { variable: srcPath, error: 8 });
      _errorInterpret(3, {
        type: "source and/or destination",
        variable: `${srcPath} and/or ${destPath}`,
      });
    } else {
      _verbInt(_verbMsgs[12], verbose, { error: err.code });
      _fatalError(err);
    }

    _verbInt(_verbMsgs[13], verbose, { error: err.code });
    return;
  }

  console.log(chalk.green("The operation completed successfully.\n"));
  _verbInt(_verbMsgs[14], verbose);
};

module.exports = copyfile;
