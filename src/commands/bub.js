const chalk = require("chalk");
const { isText } = require("istextorbinary");

const { existsSync, readFileSync } = require("fs");

const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");

const _errorInterpret = require("../functions/errorInt");
const _fatalError = require("../functions/fatalError");

const intCmds = require("../interpret");

const _interpretBubbleFile = (path, displayCommand = true) => {
  const contents = readFileSync(path, { encoding: "utf-8", flag: "r" }).split("\n");

  for (let i = 0; i < contents.length; i++) {
    const line = contents[i]?.trim();
    if (line.startsWith("#") || line === "") {
      continue;
    }

    if (displayCommand) console.log(chalk.italic.bold.red(line));
    intCmds(line, line.length === 0);
  }
};

const bub = (file, ...params) => {
  if (typeof file === "undefined") {
    _errorInterpret(2, { type: "a file", example: "bub test.bub" });
    return;
  }

  file = _replaceSpaces(file);
  file = file.endsWith(".bub") ? file : `${file}.bub`;
  file = _convertAbsolute(file);

  let displayCmd = false;
  if (params.includes("-d") || params.includes("/d")) displayCmd = true;

  if (!existsSync(file)) {
    _errorInterpret(3, { type: "file", variable: file });
    return;
  }

  try {
    if (!isText(file, readFileSync(file, { flag: "r" }))) {
      _errorInterpret(8, { encoding: "UTF-8 (plain text files)" });
      return;
    } else if (!file.endsWith(".bub")) {
      _errorInterpret(16, { type: "file", extention: ".bub" });
      return;
    }

    _interpretBubbleFile(file, displayCmd);
  } catch (err) {
    if (err.code === "EISDIR") {
      _errorInterpret(9, { command: "readfile" });
    } else {
      _fatalError(err);
    }
  }
};

module.exports = bub;
