const chalk = require("chalk");
const { isText } = require("istextorbinary");

const fs = require("fs");

const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");

const Errors = require("../classes/Errors");
const _fatalError = require("../functions/fatalError");

const wcount = (file) => {
  file = _replaceSpaces(file);

  if (!file) {
    Errors.enterParameter("a file", "wcount text.txt");
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

    console.log(chalk.italic.blueBright("Please wait..."));

    const fileContents = fs.readFileSync(fileName, { encoding: "utf-8", flag: "r" });
    console.log(`Characters (including whitespace): ${chalk.bold(fileContents.length)}`);
    console.log(`Words: ${chalk.bold(fileContents.split(" ").length)}\n`);
  } catch (err) {
    if (err.code === "EISDIR") {
      Errors.expectedFile(fileName);
    } else {
      _fatalError(err);
    }
  }
};

module.exports = wcount;
