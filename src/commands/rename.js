import chalk from "chalk";

import { existsSync, renameSync } from "fs";

import _replaceSpaces from "../functions/replaceSpaces.js";
import _convertAbsolute from "../functions/convAbs.js";

import _errorInterpret from "../functions/errorInt.js";
import _fatalError from "../functions/fatalError.js";

const rename = (file, renamed) => {
  file = _replaceSpaces(file);
  renamed = _replaceSpaces(renamed);

  if (!file || !renamed) {
    _errorInterpret(2, {
      type: "the filename and the new name",
      example: "rename hello.txt world.txt",
    });
    return;
  } else if (file.trim() === renamed.trim()) {
    console.log("Cannot be the same name (temp err msg)");
    return;
  }

  const fileName = _convertAbsolute(file.trim());
  const renamedName = _convertAbsolute(renamed.trim());

  if (!existsSync(fileName)) {
    _errorInterpret(41, { variable: fileName });
    return;
  }

  try {
    renameSync(fileName, renamedName);
    console.log(chalk.green("The operation completed successfully.\n"));
  } catch (err) {
    if (err.code === "EPERM") {
      _errorInterpret(42, {
        variable: fileName,
      });
    } else if (err.code === "EBUSY") {
      _errorInterpret(43, {
        variable: fileName,
      });
    } else {
      _fatalError(err);
    }
  }
};

export default rename;
