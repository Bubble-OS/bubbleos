const fs = require("fs");
const path = require("path");

const _getSize = (sizePath, type) => {
  if (type === "directory") {
    let totalSize = 0;
    const stack = [sizePath]; // Stack to track directories to process

    while (stack.length > 0) {
      const currentPath = stack.pop();
      const files = fs.readdirSync(currentPath, { withFileTypes: true });

      for (const file of files) {
        const filePath = path.join(currentPath, file.name);

        if (file.isDirectory()) {
          // Push subdirectory onto the stack for later processing
          stack.push(filePath);
        } else if (file.isFile()) {
          // Add the size of the file
          totalSize += fs.statSync(filePath).size;
        }
      }
    }

    return totalSize;
  } else if (type === "file") {
    return fs.statSync(sizePath).size;
  } else {
    throw new Error(`Type ${type} was not a file or directory`);
  }
};

module.exports = _getSize;
