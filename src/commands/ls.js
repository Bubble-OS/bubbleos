const chalk = require("chalk");
const { existsSync, readdirSync } = require("fs");

const _replaceSpaces = require("../functions/replaceSpaces");

const Errors = require("../classes/Errors");
const _fatalError = require("../functions/fatalError");

const ls = (directory = process.cwd(), ...params) => {
  const _logDirContents = (contents, withHighlight = false) => {
    if (withHighlight) {
      let dirStr = "";
      let maxStr =
        Math.max(...contents.map((el) => el.name.length)) * 2 -
        Math.max(...contents.map((el) => el.name.length)) / 3;

      // Loop through all of the keys of the help object (sorted)
      for (let i = 1; i < Object.keys(contents).length + 1; i++) {
        let item = contents[i - 1];

        if (item.type === "file" && item.isSymlink) dirStr += chalk.red(item.name).padEnd(maxStr);
        else if (item.type === "folder" && item.isSymlink)
          dirStr += chalk.bgRed(` ${item.name} `).padEnd(maxStr);
        else if (item.type === "file") dirStr += chalk.green(item.name).padEnd(maxStr);
        else if (
          item.type === "folder" &&
          (item.name.startsWith(".") || item.name.startsWith("_") || item.name.startsWith("$"))
        )
          dirStr += chalk.bgGrey(` ${item.name} `).padEnd(maxStr);
        else if (item.type === "folder") dirStr += chalk.bgBlue(` ${item.name} `).padEnd(maxStr);
        else dirStr += chalk.italic(item.name).padEnd(maxStr);

        if (i % 3 === 0) {
          dirStr += "\n";
        }
      }

      // Show the final string
      return dirStr + "\n";
    } else {
      let dirArr = [];
      contents.forEach((item) => {
        if (item.isSymlink) {
          if (item.type === "file") {
            dirArr.push(chalk.red(item.name));
          } else if (item.type === "folder") {
            dirArr.push(chalk.bold.red(item.name));
          }
        } else if (item.type === "file") {
          dirArr.push(chalk.green(item.name));
        } else if (
          item.type === "folder" &&
          (item.name.startsWith(".") || item.name.startsWith("_") || item.name.startsWith("$"))
        ) {
          dirArr.push(chalk.bold.grey(item.name));
        } else {
          dirArr.push(chalk.bold.blue(item.name));
        }
      });
      return dirArr;
    }
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

    if (isShort) console.log(_logDirContents(all, true));
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
