const chalk = require("chalk");
const { isText } = require("istextorbinary");

const fs = require("fs");

const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");
const _fatalError = require("../functions/fatalError");

const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");

const wcount = (file, ...args) => {
  try {
    let fileChk = new Checks(file);

    const lines = args?.includes("-l") || args?.includes("/l");
    const words = args?.includes("-w") || args?.includes("/w");
    const chars = args?.includes("-c") || args?.includes("/c");

    const defaultDisplay = !lines && !words && !chars ? true : false;

    if (fileChk.paramUndefined()) {
      Errors.enterParameter("a file", "wcount text.txt");
      return;
    }

    file = _replaceSpaces(file);
    file = _convertAbsolute(file);

    fileChk = new Checks(file);

    if (!fileChk.doesExist()) {
      Errors.doesNotExist("file", file);
      return;
    } else if (fileChk.validateType()) {
      Errors.expectedFile(file);
      return;
    } else if (fileChk.validEncoding()) {
      Errors.invalidEncoding("plain text");
      return;
    }

    const fileContents = fs.readFileSync(file, { encoding: "utf-8", flag: "r" });

    if (lines || defaultDisplay)
      console.log(`Lines: ${chalk.bold(fileContents.split("\n").length)}`);
    if (words || defaultDisplay)
      console.log(`Words: ${chalk.bold(fileContents.split(" ").length)}`);

    if (chars || defaultDisplay) {
      console.log(`Characters (including whitespace): ${chalk.bold(fileContents.length)}`);
      console.log(
        `Characters (excluding whitespace): ${chalk.bold(fileContents.replaceAll(" ", "").length)}`
      );
    }

    console.log();
  } catch (err) {
    _fatalError(err);
  }
};

module.exports = wcount;
