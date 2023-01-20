const chalk = require("chalk");
const { isText } = require("istextorbinary");

const fs = require("fs");
const path = require("path");

const _errorInterpret = require("../functions/errorInt");

const readfile = (file) => {
  if (typeof file === "undefined") {
    _errorInterpret("0x0002", { type: "a file", example: "readfile 3d-space-cadet-pinball.txt" });
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
    _errorInterpret("0x0003", { variable: fileName, type: "file", wordCode: "N/A" });
    return;
  }

  try {
    if (!isText(fileName, fs.readFileSync(fileName, { flag: "r" }))) {
      _errorInterpret("0x0006");
      return;
    }

    console.log(chalk.bold.underline.redBright(`${file} Contents\n`));

    console.log(fs.readFileSync(fileName, { encoding: "utf-8", flag: "r" }));
    console.log();
  } catch (err) {
    if (err.code === "EISDIR") {
      console.log(
        chalk.red(
          `You cannot view directories using 'readfile' (use 'ls' for that). If a file and folder name are the same, try specifing the extention to get the file contents.\nError while reading directory: ${chalk.bold(
            fileName
          )}\n`
        )
      );
    } else {
      console.log(chalk.red(`An unknown error occurred while reading file ${fileName}.\n`));
    }
  }
};

module.exports = readfile;
