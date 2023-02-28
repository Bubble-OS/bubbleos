const chalk = require("chalk");

const { execFile } = require("child_process");
const { existsSync } = require("fs");

const _fatalError = require("../functions/fatalError");

const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");

const Errors = require("../classes/Errors");

const exec = (file, ...args) => {
  if (typeof file === "undefined") {
    Errors.enterParameter("a file", "exec test");
    return;
  } else if (process.platform !== "win32") {
    Errors.invalidOS("Windows");
    return;
  }

  file = _replaceSpaces(file);
  file = _convertAbsolute(file);
  file = file.endsWith(".exe") ? file : `${file}.exe`;

  if (!existsSync(file)) {
    Errors.doesNotExist("file", file);
    return;
  }

  try {
    console.log(`Executing file: ${chalk.bold.blueBright(file)}...`);
    execFile(file, () => {});
    console.log(chalk.green("The operation completed successfully.\n"));
  } catch (err) {
    _fatalError(err);
  }
};

module.exports = exec;
