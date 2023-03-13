// Get modules
const chalk = require("chalk");
const fs = require("fs");

// Get functions
const _replaceSpaces = require("../functions/replaceSpaces");
const _fatalError = require("../functions/fatalError");

// Get classes
const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");

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
 * maximum padding to the end of each item.
 *
 * @param {[ { name: string, type: string, isSymlink: boolean } ]} contents An array of objects containing information about the files/directories.
 * @param {{ short: boolean, max: boolean }} options Options to modify the behavior of `_logDirContents()`.
 * @returns A string with the final value.
 */
const _logDirContents = (contents, options = { short: false, max: undefined }) => {
  // Define the string
  let dirStr = "";

  // Loop through the length of items in the directory
  for (let i = 1; i < Object.keys(contents).length + 1; i++) {
    // Current item
    let item = contents[i - 1];

    if (item.type === "file" && item.isSymlink) {
      // Is file and is a symbolic link
      if (options.short) dirStr += chalk.red(item.name).padEnd(options.max);
      else dirStr += chalk.red(item.name);
    } else if (item.type === "folder" && item.isSymlink) {
      // Is folder and is symbolic link
      if (options.short) dirStr += chalk.bgRed(` ${item.name} `).padEnd(options.max);
      else dirStr += chalk.bold.red(item.name);
    } else if (item.type === "file") {
      // Is file
      if (options.short) dirStr += chalk.green(item.name).padEnd(options.max);
      else dirStr += chalk.green(item.name);
    } else if (
      item.type === "folder" &&
      (item.name.startsWith(".") || item.name.startsWith("_") || item.name.startsWith("$"))
    ) {
      // Is folder and is most likely hidden
      if (options.short) dirStr += chalk.bgGrey(` ${item.name} `).padEnd(options.max);
      else dirStr += chalk.bold.grey(item.name);
    } else if (item.type === "folder") {
      // Is folder
      if (options.short) dirStr += chalk.bgBlue(` ${item.name} `).padEnd(options.max);
      else dirStr += chalk.bold.blue(item.name);
    } else {
      // Unknown type
      if (options.short) dirStr += chalk.italic(item.name).padEnd(options.max);
      else dirStr += chalk.italic(item.name);
    }

    if (i % 3 === 0 && options.short) {
      // If there are already three rows and the user requested a short view, make a new column
      dirStr += "\n";
    } else if (!options.short && i !== Object.keys(contents).length) {
      // If the user wanted the normal view and 'i' is not the final occurrence
      dirStr += "\n";
    }
  }

  // Append a newline to the end of the string and return it
  return dirStr + "\n";
};

/**
 * List the contents of a directory. For use in the
 * BubbleOS CLI shell only!
 *
 * Usage:
 *
 * ```js
 * // Arguments are accepted
 * ls(); // Contents in the CWD
 * ls("/"); // Contents in '/'
 * ```
 *
 * There is a known bug where the contents, if viewed
 * in short view, will look a bit 'off' if a file or
 * directory in the directory has a lot of characters.
 * This will be fixed in the next released version.
 *
 * Available arguments:
 * - `-s`: View the contents in a shorter view
 * (rows/columns).
 *
 * @param {fs.PathLike | string} dir Optional: the directory to view the contents in. By default, it uses the current working directory.
 * @param  {...string} args Arguments to change the behavior of `ls`.
 */
const ls = (dir = process.cwd(), ...args) => {
  try {
    // Initialize arguments
    // Do this first as '-s' can change the actual directory value
    let isShort = args.includes("-s") || args.includes("/s") || dir === "-s" || dir === "/s";

    // If the directory included '-s', change it to the current directory
    if (dir === "-s" || dir === "/s") dir = process.cwd();

    // Replace spaces
    dir = _replaceSpaces(dir);

    // Initialize checker
    const dirChk = new Checks(dir);

    if (!dirChk.doesExist()) {
      // If the path does not exist
      Errors.doesNotExist("folder", dir);
      return;
    } else if (!dirChk.validateType()) {
      // If the path is a file
      Errors.expectedDir(dir);
      return;
    }

    // Get all properties about each file and directory in a directory
    const items = fs
      .readdirSync(dir, { withFileTypes: true })
      .map((item) => ({
        name: item.name,
        type: item.isDirectory() ? "folder" : "file",
        isSymlink: item.isSymbolicLink(),
      }))
      .sort();

    // Filter all items by 'folder' first and then 'file'
    const all = items
      .filter((item) => item.type === "folder")
      .concat(items.filter((item) => item.type === "file"));

    // If there is nothing in the directory
    if (all.length === 0) {
      console.log(chalk.yellow("There are no files/directories in the directory.\n"));
      return;
    }

    // Initialize the options object
    const options = { short: isShort };
    if (isShort) {
      // If the user wanted a short view, find the longest filename for the file/directory
      const maxLength = Math.max(...all.map((el) => el.name.length));
      options.max = maxLength * 2;
      console.log(_logDirContents(all, options));
    } else {
      console.log(_logDirContents(all, options));
    }
  } catch (err) {
    // Unknown error
    _fatalError(err);
  }
};

// Export the function
module.exports = ls;
