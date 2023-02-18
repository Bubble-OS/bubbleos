const chalk = require("chalk");
const { existsSync, readdirSync } = require("fs");

const _replaceSpaces = require("../functions/replaceSpaces");

const Errors = require("../classes/Errors");
const _fatalError = require("../functions/fatalError");

const ls = (directory = process.cwd(), ...params) => {
  const _logDirContents = (contents, withHighlight = false) => {
    let dirArr = [];
    contents.forEach((item) => {
      if (item.isSymlink) {
        if (item.type === "file") {
          dirArr.push(chalk.red(item.name));
        } else if (item.type === "folder") {
          if (withHighlight) dirArr.push(chalk.bgRed(` ${item.name} `));
          else dirArr.push(chalk.bold.red(item.name));
        }
      } else if (item.type === "file") {
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
      Errors.doesNotExist("folder", directory);
      return;
    }

    const files = readdirSync(directory, { withFileTypes: true })
      .filter((item) => !item.isDirectory())
      .map((item) => {
        return { name: item.name, type: "file", isSymlink: item.isSymbolicLink() };
      })
      .sort();

    const folders = readdirSync(directory, { withFileTypes: true })
      .filter((item) => item.isDirectory())
      .map((item) => {
        return { name: item.name, type: "folder", isSymlink: item.isSymbolicLink() };
      })
      .sort();

    const all = [...folders, ...files];

    if (all.length === 0) {
      console.log(chalk.yellow("There are no files/directories in the directory.\n"));
      return;
    }

    if (isShort) console.log(_logDirContents(all, true).join("  ") + "\n");
    else console.log(_logDirContents(all, false).join("\n") + "\n");
  } catch (err) {
    if (err.code === "ENOTDIR") {
      Errors.expectedDir(directory);
      return;
    }
    _fatalError(err);
  }
};

module.exports = ls;
