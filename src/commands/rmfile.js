const chalk = require("chalk");
const readline = require("readline-sync");

const fs = require("fs");
const path = require("path");

const _errorInterpret = require("../functions/errorInt");

const rmfile = (fileNameParam) => {
  if (typeof fileNameParam === "undefined") {
    _errorInterpret("0x0035");
    return;
  }

  const isAbsolutePath = path.isAbsolute(fileNameParam);
  let fileName = "";
  if (!isAbsolutePath) {
    fileName = process.cwd() + "\\" + fileNameParam;
  } else {
    fileName = fileNameParam;
  }

  if (!fs.existsSync(fileName)) {
    _errorInterpret("0x0030", { variable: fileName });
    return;
  }

  const confirmText = readline
    .question(
      `Are you sure you want to delete the file: ${chalk.bold(fileName)}? [${chalk.green(
        "y"
      )}/${chalk.red.bold("N")}] `
    )
    .toLowerCase();
  if (confirmText.includes("n") || !confirmText.includes("y")) {
    _errorInterpret("0x0037");
    return;
  }

  console.log(`\nDeleting file: ${chalk.bold.blueBright(fileName)}...`);

  try {
    fs.unlinkSync(fileName);

    console.log(chalk.green("The operation completed successfully.\n"));
  } catch (err) {
    if (err.code === "EBUSY") {
      _errorInterpret("0x0038", { variable: fileName });
    } else if (err.code === "EPERM") {
      _errorInterpret("0x0039", { variable: fileName });
    } else {
      _errorInterpret("0x0040", { variable: fileName, wordCode: err.code });
    }
  }
};

module.exports = rmfile;
