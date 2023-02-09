const chalk = require("chalk");
const { isText } = require("istextorbinary");

const fs = require("fs");

const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");

const _errorInterpret = require("../functions/errorInt");
const _fatalError = require("../functions/fatalError");

const readfile = (file) => {
  file = _replaceSpaces(file);

  if (typeof file === "undefined") {
    _errorInterpret(2, { type: "a file", example: "readfile test.txt" });
    return;
  }

  const fileName = _convertAbsolute(file);

  if (!fs.existsSync(fileName)) {
    _errorInterpret(3, { type: "file", variable: fileName });
    return;
  }

  try {
    if (!isText(fileName, fs.readFileSync(fileName, { flag: "r" }))) {
      _errorInterpret(8, { encoding: "UTF-8 (plain text files)" });
      return;
    }

    console.log(chalk.bold.underline.redBright(`${file} Contents\n`));

    console.log(fs.readFileSync(fileName, { encoding: "utf-8", flag: "r" }));
    console.log();
  } catch (err) {
    if (err.code === "EISDIR") {
      _errorInterpret(9, { command: "readfile" });
    } else {
      _fatalError(err);
    }
  }
};

module.exports = readfile;
