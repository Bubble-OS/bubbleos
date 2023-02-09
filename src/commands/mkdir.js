import chalk from "chalk";
import { existsSync, mkdirSync } from "fs";

import _replaceSpaces from "../functions/replaceSpaces.js";
import _convertAbsolute from "../functions/convAbs.js";

import _errorInterpret from "../functions/errorInt.js";
import _fatalError from "../functions/fatalError.js";

const mkdir = (dirName) => {
  dirName = _replaceSpaces(dirName);

  if (!dirName) {
    _errorInterpret(2, { type: "a directory", example: "mkdir test" });
    return;
  }

  const dir = _convertAbsolute(dirName);

  try {
    if (!existsSync(dir)) {
      console.log(`Making directory: ${chalk.bold.blueBright(dir)}...`);
      mkdirSync(dir);
      console.log(chalk.green("The operation completed successfully.\n"));
    } else {
      _errorInterpret(6, { type: "directory", variable: dir });
    }
  } catch (err) {
    if (err.code === "EPERM") {
      _errorInterpret(4, { todo: "make the directory", variable: dir });
    } else {
      _fatalError(err);
    }
  }
};

export default mkdir;
