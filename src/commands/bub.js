const fs = require("fs");

const chalk = require("chalk");

const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");

const _fatalError = require("../functions/fatalError");

const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");

const _interpretBubbleFile = (intCmds, path, displayCommand = true) => {
  const contents = fs.readFileSync(path, { encoding: "utf-8", flag: "r" }).split("\n");

  for (let i = 0; i < contents.length; i++) {
    const line = contents[i]?.trim();
    if (line.startsWith("#") || line === "") {
      continue;
    }

    if (displayCommand) console.log(chalk.italic.bold.red(line));
    intCmds(line);
  }
};

const bub = (intCmds, file, ...args) => {
  try {
    let fileChk = new Checks(file);

    if (fileChk.paramUndefined()) {
      Errors.enterParameter("a file", "bub test.bub");
      return;
    }

    const displayCmd = args.includes("-d") || args.includes("/d");

    file = _replaceSpaces(file);
    file = file.endsWith(".bub") ? file : `${file}.bub`;
    file = _convertAbsolute(file);

    fileChk = new Checks(file);

    if (!fileChk.doesExist()) {
      Errors.doesNotExist("file", file);
      return;
    } else if (fileChk.validEncoding()) {
      Errors.invalidEncoding("plain text");
      return;
    } else if (fileChk.validateType()) {
      Errors.expectedFile(file);
      return;
    }

    _interpretBubbleFile(intCmds, file, displayCmd);
  } catch (err) {
    _fatalError(err);
  }
};

module.exports = bub;
