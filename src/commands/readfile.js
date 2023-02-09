import chalk from "chalk";
import { isText } from "istextorbinary";

import { existsSync, readFileSync } from "fs";

import _replaceSpaces from "../functions/replaceSpaces.js";
import _convertAbsolute from "../functions/convAbs.js";

import _errorInterpret from "../functions/errorInt.js";
import _fatalError from "../functions/fatalError.js";

const readfile = (file) => {
  file = _replaceSpaces(file);

  if (typeof file === "undefined") {
    _errorInterpret(2, { type: "a file", example: "readfile test.txt" });
    return;
  }

  const fileName = _convertAbsolute(file);

  if (!existsSync(fileName)) {
    _errorInterpret(3, { type: "file", variable: fileName });
    return;
  }

  try {
    if (!isText(fileName, readFileSync(fileName, { flag: "r" }))) {
      _errorInterpret(8, { encoding: "UTF-8 (plain text files)" });
      return;
    }

    console.log(chalk.bold.underline.redBright(`${file} Contents\n`));

    console.log(readFileSync(fileName, { encoding: "utf-8", flag: "r" }));
    console.log();
  } catch (err) {
    if (err.code === "EISDIR") {
      _errorInterpret(9, { command: "readfile" });
    } else {
      _fatalError(err);
    }
  }
};

export default readfile;
