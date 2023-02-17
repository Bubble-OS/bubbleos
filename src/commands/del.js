const chalk = require("chalk");
const { question } = require("readline-sync");

const { existsSync, rmSync } = require("fs");

const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");

const _fatalError = require("../functions/fatalError");

const Errors = require("../classes/Errors");

const del = (file, ...params) => {
  let confirm = true;
  if (params.includes("-y") || params.includes("/y")) confirm = false;

  if (!file) {
    Errors.enterParameter("a file/directory", "del test");
    return;
  }

  file = _replaceSpaces(file);
  file = _convertAbsolute(file);

  if (!existsSync(file)) {
    Errors.doesNotExist("file/directory", file);
    return;
  }

  if (confirm) {
    const confirmText = question(
      `Are you sure you want to delete ${chalk.bold(file)}? [${chalk.green("y")}/${chalk.red.bold(
        "N"
      )}] `
    ).toLowerCase();
    if (confirmText.includes("n") || !confirmText.includes("y")) {
      console.log(chalk.yellow("Operation cancelled.\n"));
      return;
    }
  }

  try {
    console.log(`Deleting ${chalk.bold.blueBright(file)}...`);
    rmSync(file, { recursive: true, force: true });
    console.log(chalk.green("The operation completed successfully.\n"));
  } catch (err) {
    if (err.code === "EBUSY") {
      Errors.inUse("file/directory", file);
    } else if (err.code === "EPERM") {
      Errors.noPermissions("delete the file/directory", file);
    } else {
      _fatalError(err);
    }
  }
};

module.exports = del;
