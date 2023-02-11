import chalk from "chalk";
import { isText } from "istextorbinary";

import { existsSync, readFileSync } from "fs";

import _replaceSpaces from "../functions/replaceSpaces.js";
import _convertAbsolute from "../functions/convAbs.js";

import _errorInterpret from "../functions/errorInt.js";
import _fatalError from "../functions/fatalError.js";

import intCmds from "../interpret.js";

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
      console.log("File must end with '.bub' (temp err msg)");
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

export default bub;
