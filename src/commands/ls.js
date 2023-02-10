import chalk from "chalk";
import { existsSync, readdirSync } from "fs";

import _replaceSpaces from "../functions/replaceSpaces.js";

import _errorInterpret from "../functions/errorInt.js";
import _fatalError from "../functions/fatalError.js";

const ls = (directory = process.cwd(), ...params) => {
  const _logDirContents = (contents, withHighlight = false) => {
    let dirArr = [];
    contents.forEach((item) => {
      if (item.type === "file") {
        dirArr.push(chalk.green(item.name));
      } else if (
        item.type === "folder" &&
        (item.name.startsWith(".") || item.name.startsWith("_") || item.name.startsWith("$"))
      ) {
        if (withHighlight) dirArr.push(chalk.bgGrey(` ${item.name} `));
        else dirArr.push(chalk.bold.grey(item.name));
      } else {
        if (withHighlight) dirArr.push(chalk.bgBlue(` ${item.name} `));
        else dirArr.push(chalk.bold.blue(item.name));
      }
    });
    return dirArr;
  };

  try {
    let isShort = false;
    if (
      params.includes("-s") ||
      params.includes("/s") ||
      directory.includes("-s") ||
      directory.includes("/s")
    )
      isShort = true;

    if (directory.includes("-s") || directory.includes("/s")) directory = process.cwd();

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

    if (isShort) console.log(_logDirContents(all, true).join("  ") + "\n");
    else console.log(_logDirContents(all, false).join("\n") + "\n");
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
