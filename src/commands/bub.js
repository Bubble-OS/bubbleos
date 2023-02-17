const chalk = require("chalk");
const { isText } = require("istextorbinary");

const { existsSync, readFileSync } = require("fs");

const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");

const _fatalError = require("../functions/fatalError");

const Errors = require("../classes/Errors");

const _interpretBubbleFile = (intCmds, path, displayCommand = true) => {
  const contents = readFileSync(path, { encoding: "utf-8", flag: "r" }).split("\n");

  for (let i = 0; i < contents.length; i++) {
    const line = contents[i]?.trim();
    if (line.startsWith("#") || line === "") {
      continue;
    }

    if (displayCommand) console.log(chalk.italic.bold.red(line));
    intCmds(line);
  }
};

const bub = (intCmds, file, ...params) => {
  if (typeof file === "undefined") {
    Errors.enterParameter("a file", "bub test.bub");
    return;
  }

  file = _replaceSpaces(file);
  file = file.endsWith(".bub") ? file : `${file}.bub`;
  file = _convertAbsolute(file);

  let displayCmd = false;
  if (params.includes("-d") || params.includes("/d")) displayCmd = true;

  if (!existsSync(file)) {
    Errors.doesNotExist("file", file);
    return;
  }

  try {
    if (!isText(file, readFileSync(file, { flag: "r" }))) {
      Errors.invalidEncoding("plain text");
      return;
    }

    _interpretBubbleFile(intCmds, file, displayCmd);
  } catch (err) {
    if (err.code === "EISDIR") {
      Errors.expectedFile(file);
      return;
    } else {
      _fatalError(err);
    }
  }
};

module.exports = bub;
