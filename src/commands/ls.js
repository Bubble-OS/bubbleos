import chalk from "chalk";
import { existsSync, readdirSync } from "fs";

import _replaceSpaces from "../functions/replaceSpaces.js";

import _errorInterpret from "../functions/errorInt.js";
import _fatalError from "../functions/fatalError.js";

const ls = (directory = process.cwd()) => {
  try {
    directory = _replaceSpaces(directory);

    if (!existsSync(directory)) {
      _errorInterpret(3, { type: "directory", variable: directory });
      return;
    }

    const files = readdirSync(directory, { withFileTypes: true })
      .filter((item) => !item.isDirectory())
      .map((item) => {
        return { name: item.name, type: "file" };
      })
      .sort();

    const folders = readdirSync(directory, { withFileTypes: true })
      .filter((item) => item.isDirectory())
      .map((item) => {
        return { name: item.name, type: "folder" };
      })
      .sort();

    const all = [...folders, ...files];

    all.forEach((item) => {
      if (item.type === "file") {
        console.log(chalk.green(item.name));
      } else if (
        item.type === "folder" &&
        (item.name.startsWith(".") || item.name.startsWith("_") || item.name.startsWith("$"))
      ) {
        console.log(chalk.bold.grey(item.name));
      } else {
        console.log(chalk.bold.blue(item.name));
      }
    });

    console.log();
  } catch (err) {
    if (err.code === "ENOTDIR") {
      // TODO Add an error message for 'ENOTDIR'
      // _errorInterpret(53);
      console.log("Cannot use dir (temp err msg)");
      return;
    }
    _fatalError(err);
  }
};

export default ls;
