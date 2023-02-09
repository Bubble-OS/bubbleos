import chalk from "chalk";
import { question } from "readline-sync";

import { existsSync, rmSync } from "fs";

import _replaceSpaces from "../functions/replaceSpaces.js";
import _convertAbsolute from "../functions/convAbs.js";

import _errorInterpret from "../functions/errorInt.js";
import _fatalError from "../functions/fatalError.js";

const del = (file) => {
  file = _replaceSpaces(file);

  if (!file) {
    _errorInterpret(2, { type: "a file/directory", example: "del test" });
    return;
  }

  const fileName = _convertAbsolute(file);

  if (!existsSync(fileName)) {
    _errorInterpret(3, { type: "file/directory", variable: fileName });
    return;
  }

  const confirmText = question(
    `Are you sure you want to delete ${chalk.bold(fileName)}? [${chalk.green("y")}/${chalk.red.bold(
      "N"
    )}] `
  ).toLowerCase();
  if (confirmText.includes("n") || !confirmText.includes("y")) {
    console.log(chalk.yellow("Operation cancelled.\n"));
    return;
  }

  try {
    console.log(`\nDeleting ${chalk.bold.blueBright(fileName)}...`);
    rmSync(fileName, { recursive: true, force: true });
    console.log(chalk.green("The operation completed successfully.\n"));
  } catch (err) {
    if (err.code === "EBUSY") {
      _errorInterpret(7, { todo: "file/directory", variable: fileName });
    } else if (err.code === "EPERM") {
      _errorInterpret(4, { todo: "delete the file/directory", variable: fileName });
    } else {
      _fatalError(err);
    }
  }
};

export default del;
