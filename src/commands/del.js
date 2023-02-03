const chalk = require("chalk");
const readline = require("readline-sync");

const fs = require("fs");

const _convertAbsolute = require("../functions/convAbs");

const _errorInterpret = require("../functions/errorInt");
const _fatalError = require("../functions/fatalError");

const del = (file) => {
  if (!file) {
    _errorInterpret(22);
    return;
  }

  const fileName = _convertAbsolute(file);

  if (!fs.existsSync(fileName)) {
    _errorInterpret(23, { variable: fileName });
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
    _errorInterpret(24);
    return;
  }

  console.log(`\nDeleting ${chalk.bold.blueBright(fileName)}...`);

  try {
    fs.rmSync(fileName, { recursive: true, force: true });
    console.log(chalk.green("The operation completed successfully.\n"));
  } catch (err) {
    if (err.code === "EBUSY") {
      _errorInterpret(25, { variable: fileName });
    } else if (err.code === "EPERM") {
      _errorInterpret(26, { variable: fileName });
    } else {
      _fatalError(err);
    }
  }
};

module.exports = del;
