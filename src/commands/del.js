const chalk = require("chalk");
const readline = require("readline-sync");

const fs = require("fs");
const path = require("path");

const _errorInterpret = require("../functions/errorInt");

const del = (file) => {
  if (typeof file === "undefined") {
    _errorInterpret("0x0029");
    return;
  }

  const isAbsolutePath = path.isAbsolute(file);
  let fileName = "";
  if (!isAbsolutePath) {
    fileName = process.cwd() + "\\" + file;
  } else {
    fileName = file;
  }

  if (!fs.existsSync(fileName)) {
    _errorInterpret("0x0030", { variable: fileName });
    return;
  }

  const confirmText = readline
    .question(
      `Are you sure you want to delete ${chalk.bold(fileName)}? [${chalk.green(
        "y"
      )}/${chalk.red.bold("N")}] `
    )
    .toLowerCase();
  if (confirmText.includes("n") || !confirmText.includes("y")) {
    _errorInterpret("0x0031");
    return;
  }

  console.log(`\nDeleting ${chalk.bold.blueBright(fileName)}...`);

  try {
    fs.rmSync(fileName, { recursive: true, force: true });
    console.log(chalk.green("The operation completed successfully.\n"));
  } catch (err) {
    if (err.code === "EBUSY") {
      _errorInterpret("0x0032", { variable: fileName });
    } else if (err.code === "EPERM") {
      _errorInterpret("0x0033", { variable: fileName });
    } else {
      _errorInterpret("0x0044", { variable: fileName, wordCode: err.code });
    }
  }
};

module.exports = del;
