const chalk = require("chalk");
const readline = require("readline-sync");

const fs = require("fs");

const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");

const _errorInterpret = require("../functions/errorInt");
const _fatalError = require("../functions/fatalError");

const del = (file) => {
  file = _replaceSpaces(file);

  if (!file) {
    _errorInterpret(2, { type: "a file/directory", example: "del test" });
    return;
  }

  const fileName = _convertAbsolute(file);

  if (!fs.existsSync(fileName)) {
    _errorInterpret(3, { type: "file/directory", variable: fileName });
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
    console.log(chalk.yellow("Operation cancelled.\n"));
    return;
  }

  try {
    console.log(`\nDeleting ${chalk.bold.blueBright(fileName)}...`);
    fs.rmSync(fileName, { recursive: true, force: true });
    console.log(chalk.green("The operation completed successfully.\n"));
  } catch (err) {
    if (err.code === "EBUSY") {
      _errorInterpret(7, { todo: "file/directory", variable: fileName });
    } else if (err.code === "EPERM") {
      _errorInterpret(4, { todo: "delete the file/directory", variable: fileName });
    } else {
      _fatalError(err);
    }
  }
};

module.exports = del;
