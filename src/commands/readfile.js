const chalk = require("chalk");
const { isText } = require("istextorbinary");

const fs = require("fs");
const path = require("path");

const _errorInterpret = require("../functions/errorInt");

const readfile = (file) => {
  if (typeof file === "undefined") {
    _errorInterpret("0x0024");
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
    _errorInterpret("0x0025", { variable: fileName });
    return;
  }

  try {
    if (!isText(fileName, fs.readFileSync(fileName, { flag: "r" }))) {
      _errorInterpret("0x0026");
      return;
    }

    console.log(chalk.bold.underline.redBright(`${file} Contents\n`));

    console.log(fs.readFileSync(fileName, { encoding: "utf-8", flag: "r" }));
    console.log();
  } catch (err) {
    if (err.code === "EISDIR") {
      _errorInterpret("0x0027", { variable: fileName });
    } else {
      _errorInterpret("0x0028", { variable: fileName, wordCode: err.code });
    }
  }
};

module.exports = readfile;
