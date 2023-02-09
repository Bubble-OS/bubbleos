import chalk from "chalk";
import { isText } from "istextorbinary";

import { existsSync, readFileSync } from "fs";

import _replaceSpaces from "../functions/replaceSpaces.js";
import _convertAbsolute from "../functions/convAbs.js";

import _errorInterpret from "../functions/errorInt.js";
import _fatalError from "../functions/fatalError.js";

const wcount = (file) => {
  file = _replaceSpaces(file);

  if (!file) {
    _errorInterpret(2, { type: "a file", example: "wcount test.txt" });
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

    console.log(chalk.italic.blueBright("Please wait..."));

    const fileContents = readFileSync(fileName, { encoding: "utf-8", flag: "r" });
    console.log(`Characters (including whitespace): ${chalk.bold(fileContents.length)}`);
    console.log(`Words: ${chalk.bold(fileContents.split(" ").length)}\n`);
  } catch (err) {
    if (err.code === "EISDIR") {
      _errorInterpret(9, { command: "wcount" });
    } else {
      _fatalError(err);
    }
  }
};

export default wcount;
