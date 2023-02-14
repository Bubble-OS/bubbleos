const chalk = require("chalk");
const { isText } = require("istextorbinary");

const fs = require("fs");

const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");

const Errors = require("../classes/Errors");
const _fatalError = require("../functions/fatalError");

const readfile = (file) => {
  file = _replaceSpaces(file);

  if (typeof file === "undefined") {
    Errors.enterParameter("a file", "readfile test.txt");
    return;
  }

  const fileName = _convertAbsolute(file);

  if (!fs.existsSync(fileName)) {
    Errors.doesNotExist("file", fileName);
    return;
  }

  try {
    if (!isText(fileName, fs.readFileSync(fileName, { flag: "r" }))) {
      Errors.invalidEncoding("plain text");
      return;
    }

    console.log(chalk.bold.underline.redBright(`${file} Contents\n`));

    console.log(fs.readFileSync(fileName, { encoding: "utf-8", flag: "r" }));
    console.log();
  } catch (err) {
    if (err.code === "EISDIR") {
      Errors.expectedFile(fileName);
    } else {
      _fatalError(err);
    }
  }
};

module.exports = readfile;
