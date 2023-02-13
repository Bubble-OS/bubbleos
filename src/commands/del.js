const chalk = require("chalk");
const { question } = require("readline-sync");

const { existsSync, rmSync } = require("fs");

const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");

const _fatalError = require("../functions/fatalError");

const Errors = require("../classes/Errors");

const del = (file) => {
  file = _replaceSpaces(file);

  if (!file) {
    Errors.enterParameter("a file/directory", "del test");
    return;
  }

  const fileName = _convertAbsolute(file);

  if (!existsSync(fileName)) {
    Errors.doesNotExist("file/directory", fileName);
    return;
  }

  const confirmText = question(
    `Are you sure you want to delete ${chalk.bold(fileName)}? [${chalk.green("y")}/${chalk.red.bold(
      "N"
    )}] `
  ).toLowerCase();
  if (confirmText.includes("n") || !confirmText.includes("y")) {
    console.log(chalk.yellow("Operation cancelled.\n"));
    return;
  }

  try {
    console.log(`\nDeleting ${chalk.bold.blueBright(fileName)}...`);
    rmSync(fileName, { recursive: true, force: true });
    console.log(chalk.green("The operation completed successfully.\n"));
  } catch (err) {
    if (err.code === "EBUSY") {
      Errors.inUse("file/directory", fileName);
    } else if (err.code === "EPERM") {
      Errors.noPermissions("delete the file/directory", fileName);
    } else {
      _fatalError(err);
    }
  }
};

module.exports = del;
