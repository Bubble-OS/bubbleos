// Get modules
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

// Get functions
const _parseDoubleQuotes = require("../functions/parseQuotes");
const _convertAbsolute = require("../functions/convAbs");
const _fatalError = require("../functions/fatalError");

// Get classes
const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");

/**
 * Internal helper function to generate the tree for `dirtree`.
 *
 * @param {string} currentDir Directory to begin the tree in.
 * @param {string} prefix It is prefered to leave this to the default value.
 */
const _generateTree = (currentDir, prefix = "") => {
  let items;

  try {
    // Attempt to read the directory contents
    items = fs.readdirSync(currentDir);
  } catch (err) {
    console.log(chalk.red(`${prefix}└── [ERROR] Unable to access: ${currentDir}`));
    return; // Skip this directory and return
  }

  items.forEach((item, index) => {
    const itemPath = path.join(currentDir, item);
    const isLastItem = index === items.length - 1;

    try {
      const isDirectory = fs.statSync(itemPath).isDirectory();

      // Print the item with the tree-like structure
      console.log(`${prefix}${isLastItem ? "└── " : "├── "}${item}`);

      if (isDirectory) {
        // Update the prefix for the next level
        const newPrefix = prefix + (isLastItem ? "    " : "│   ");
        _generateTree(itemPath, newPrefix);
      }
    } catch (err) {
      // Handle inaccessible files or directories
      console.log(
        chalk.red(`${prefix}${isLastItem ? "└──" : "├──"} [ERROR] Unable to access: ${item}`)
      );
    }
  });
};

/**
 * Generate a directory tree, showing a visual representation of the directories
 * and files inside of a directory, as well as nested ones.
 *
 * The command is visually identical to the Windows `tree` command.
 *
 * @param {string} dir The directory to start the tree in.
 * @param  {...string} args Arguments to change the behavior of `dirtree`.
 */
const dirtree = (dir = process.cwd(), ...args) => {
  try {
    dir = _parseDoubleQuotes([dir, ...args])[0];

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

    // Start the tree generation with an empty prefix
    console.log(chalk.bold(_convertAbsolute(dir)));
    _generateTree(dir);
  } catch (err) {
    // Unknown error
    _fatalError(err);
  }
};

module.exports = dirtree;
