// Get modules
const chalk = require("chalk");
const fs = require("fs");

// Get functions
const _replaceSpaces = require("../functions/replaceSpaces");
const _fatalError = require("../functions/fatalError");

// Get classes
const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");

const ls = (dir = process.cwd(), ...args) => {
  try {
    /**
     * Log the directory contents. This is a private
     * and should not be used outside of the `ls()`
     * function.
     *
     * Format the contents of the directory depending
     * on options, such as if the user wanted to
     * view the directory in a short view.
     *
     * Usage:
     *
     * ```js
     * _logDirContents(dirContents, { short: false }); // More options are accepted
     * ```
     *
     * Options:
     * - `short`: If the directory should be in a short
     * view or not. Default: `false`.
     * - `max`: Only applies if `short` is `true`. The
     * maxmimum padding to the end of each item.
     *
     * @param {[ { name: string, type: string, isSymlink: boolean } ]} contents An array of objects containing information about the files/directories.
     * @param {*} options
     * @returns
     */
    const _logDirContents = (contents, options = { short: false, max: undefined }) => {
      let dirStr = "";

      for (let i = 1; i < Object.keys(contents).length + 1; i++) {
        let item = contents[i - 1];

        if (item.type === "file" && item.isSymlink) {
          if (options.short) dirStr += chalk.red(item.name).padEnd(options.max);
          else dirStr += chalk.red(item.name);
        } else if (item.type === "folder" && item.isSymlink) {
          if (options.short) dirStr += chalk.bgRed(` ${item.name} `).padEnd(options.max);
          else dirStr += chalk.bold.red(item.name);
        } else if (item.type === "file") {
          if (options.short) dirStr += chalk.green(item.name).padEnd(options.max);
          else dirStr += chalk.green(item.name);
        } else if (
          item.type === "folder" &&
          (item.name.startsWith(".") || item.name.startsWith("_") || item.name.startsWith("$"))
        ) {
          if (options.short) dirStr += chalk.bgGrey(` ${item.name} `).padEnd(options.max);
          else dirStr += chalk.bold.grey(item.name);
        } else if (item.type === "folder") {
          if (options.short) dirStr += chalk.bgBlue(` ${item.name} `).padEnd(options.max);
          else dirStr += chalk.bold.blue(item.name);
        } else {
          if (options.short) dirStr += chalk.italic(item.name).padEnd(options.max);
          else dirStr += chalk.italic(item.name);
        }

        if (i % 3 === 0 && options.short) {
          dirStr += "\n";
        } else if (!options.short && i !== Object.keys(contents).length) {
          dirStr += "\n";
        }
      }

      return dirStr + "\n";
    };

    let isShort =
      args.includes("-s") || args.includes("/s") || dir.includes("-s") || dir.includes("/s");

    if (dir.includes("-s") || dir.includes("/s")) dir = process.cwd();

    dir = _replaceSpaces(dir);

    const dirChk = new Checks(dir);

    if (!dirChk.doesExist()) {
      Errors.doesNotExist("folder", dir);
      return;
    } else if (!dirChk.validateType()) {
      Errors.expectedDir(dir);
      return;
    }

    const items = fs
      .readdirSync(dir, { withFileTypes: true })
      .map((item) => ({
        name: item.name,
        type: item.isDirectory() ? "folder" : "file",
        isSymlink: item.isSymbolicLink(),
      }))
      .sort();

    const all = items
      .filter((item) => item.type === "folder")
      .concat(items.filter((item) => item.type === "file"));

    if (all.length === 0) {
      console.log(chalk.yellow("There are no files/directories in the directory.\n"));
      return;
    }

    const options = { short: isShort };
    if (isShort) {
      const maxLength = Math.max(...all.map((el) => el.name.length));
      options.max = maxLength * 2;
      console.log(_logDirContents(all, options));
    } else {
      console.log(_logDirContents(all, options));
    }
  } catch (err) {
    _fatalError(err);
  }
};

module.exports = ls;
