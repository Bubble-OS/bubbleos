const chalk = require("chalk");
const exec = require("child_process").execFile;
const fs = require("fs");

const _errorInterpret = require("../functions/errorInt");

// Named 'execFile' to avoid naming conflicts
const execFile = (execFilename) => {
  if (typeof execFilename === "undefined") {
    _errorInterpret("0x0011");
    return;
  } else if (process.platform !== "win32") {
    _errorInterpret("0x0012");
    return;
  }

  const execFilenameExe = execFilename.endsWith(".exe") ? execFilename : `${execFilename}.exe`;
  const fullPath = process.cwd() + "\\" + execFilenameExe;

  if (!fs.existsSync(execFilenameExe)) {
    _errorInterpret("0x0013");
    return;
  }

  console.log(`Executing file: ${chalk.bold.blueBright(fullPath)}...`);

  try {
    exec(execFilenameExe, () => {});
    console.log(chalk.green("Executed successfully.\n"));
  } catch (err) {
    _errorInterpret("0x0014");
  }
};

module.exports = execFile;
