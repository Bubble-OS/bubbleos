const chalk = require("chalk");

const { existsSync, rmSync } = require("fs");

const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");
const _promptForYN = require("../functions/promptForYN");
const _fatalError = require("../functions/fatalError");

const Errors = require("../classes/Errors");

const del = (file, ...args) => {
  if (typeof file === "undefined") {
    Errors.enterParameter("a file/directory", "del test");
    return;
  }

  const confirm = !(args.includes("-y") || args.includes("/y"));

  file = _replaceSpaces(file);
  file = _convertAbsolute(file);

  if (!existsSync(file)) {
    Errors.doesNotExist("file/directory", file);
    return;
  }

  if (confirm) {
    if (!_promptForYN(`Are you sure you want to delete ${chalk.bold(file)}?`)) {
      console.log(chalk.yellow("Operation cancelled.\n"));
      return;
    }

    console.log();
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
