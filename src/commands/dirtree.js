// Get modules
const fs = require("fs");
const path = require("path");

// Get functions
const _parseDoubleQuotes = require("../functions/parseQuotes");
const _fatalError = require("../functions/fatalError");

// Function to generate a tree-like structure
const dirtree = (dir = process.cwd(), ...args) => {
  try {
    dir = _parseDoubleQuotes([dir, ...args])[0];

    // Internal helper function with a closure for the prefix
    const generateTree = (currentDir, prefix) => {
      const items = fs.readdirSync(currentDir);

      items.forEach((item, index) => {
        const itemPath = path.join(currentDir, item);
        const isLastItem = index === items.length - 1;
        const isDirectory = fs.statSync(itemPath).isDirectory();

        // Print the item with the tree-like structure
        console.log(`${prefix}${isLastItem ? "└── " : "├── "}${item}`);

        if (isDirectory) {
          // Update the prefix for the next level
          const newPrefix = prefix + (isLastItem ? "    " : "│   ");
          generateTree(itemPath, newPrefix);
        }
      });
    };

    // Start the tree generation with an empty prefix
    generateTree(dir, "");
  } catch (err) {
    // Unknown error
    _fatalError(err);
  }
};

module.exports = dirtree;
