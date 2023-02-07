const chalk = require("chalk");

const { execFile: exec } = require("child_process");
const fs = require("fs");

const _errorInterpret = require("../functions/errorInt");
const _fatalError = require("../functions/fatalError");

const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");

// Named 'execFile' to avoid naming conflicts
const execFile = (execFilename) => {
  execFilename = _replaceSpaces(execFilename);

  if (typeof execFilename === "undefined") {
    _errorInterpret(9);
    return;
  } else if (process.platform !== "win32") {
    _errorInterpret(10);
    return;
  }

  const execFilenameExe = execFilename.endsWith(".exe") ? execFilename : `${execFilename}.exe`;
  const fullPath = _convertAbsolute(execFilenameExe);

  if (!fs.existsSync(execFilenameExe)) {
    _errorInterpret(11, { variable: execFilenameExe });
    return;
  }

  console.log(`Executing file: ${chalk.bold.blueBright(fullPath)}...`);

  try {
    exec(execFilenameExe, () => {});
    console.log(chalk.green("Executed successfully.\n"));
  } catch (err) {
    _fatalError(err);
  }
};

module.exports = execFile;
