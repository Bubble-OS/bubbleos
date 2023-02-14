const chalk = require("chalk");

const { execFile: exec } = require("child_process");
const { existsSync } = require("fs");

const _fatalError = require("../functions/fatalError");

const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");

const Errors = require("../classes/Errors");

// Named 'execFile' to avoid naming conflicts
const execFile = (execFilename) => {
  execFilename = _replaceSpaces(execFilename);

  if (typeof execFilename === "undefined") {
    Errors.enterParameter("a file", "exec test");
    return;
  } else if (process.platform !== "win32") {
    Errors.invalidOS("Windows");
    return;
  }

  const execFilenameExe = execFilename.endsWith(".exe") ? execFilename : `${execFilename}.exe`;
  const fullPath = _convertAbsolute(execFilenameExe);

  if (!existsSync(fullPath)) {
    Errors.doesNotExist("file", fullPath);
    return;
  }

  try {
    console.log(`Executing file: ${chalk.bold.blueBright(fullPath)}...`);
    exec(fullPath, () => {});
    console.log(chalk.green("Executed successfully.\n"));
  } catch (err) {
    _fatalError(err);
  }
};

module.exports = execFile;
