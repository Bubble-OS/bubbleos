import chalk from "chalk";
import { isText } from "istextorbinary";

import { existsSync, readFileSync } from "fs";

import _replaceSpaces from "../functions/replaceSpaces.js";
import _convertAbsolute from "../functions/convAbs.js";

import _errorInterpret from "../functions/errorInt.js";
import _fatalError from "../functions/fatalError.js";

import intCmds from "../interpret.js";

const bub = (file) => {
  file = _replaceSpaces(file);

  const _interpretBubbleFile = (path) => {
    const contents = readFileSync(file, { encoding: "utf-8", flag: "r" }).split("\n");

    for (let i = 0; i < contents.length; i++) {
      const line = contents[i]?.trim();
      if (line.startsWith("#") || line === "") {
        continue;
      }
      console.log(chalk.italic.bold.red(line));
      intCmds(line, line.length === 0);
    }
  };

  if (typeof file === "undefined") {
    _errorInterpret(2, { type: "a file", example: "bub test.bub" });
    return;
  }

  file = _convertAbsolute(file);

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

    _interpretBubbleFile(file);
  } catch (err) {
    if (err.code === "EISDIR") {
      _errorInterpret(9, { command: "readfile" });
    } else {
      _fatalError(err);
    }
  }
};

export default bub;
