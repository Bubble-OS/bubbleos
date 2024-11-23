// Get modules
const fs = require("fs");

// Get functions
const { isAbsolute } = require("path");
const _fatalError = require("./fatalError");

/**
 * Convert a path to an absolute path, unless the path is already an absolute path.
 *
 * Usage:
 *
 * ```js
 * _convertAbsolute("hello.txt"); // Should return: C:\Users\User\hello.txt (assuming that the CWD is 'C:\Users\User)
 * _convertAbsolute("/usr/user\\hello.txt") // Should return: /usr/user/hello.txt
 * ```
 *
 * Example of a relative path: `./test.txt`
 *
 * Example of an absolute path: `D:\a\directory\with\a\file\test.txt`
 *
 * @param {fs.PathLike | string} path The absolute/relative path to convert.
 * @returns A string of the new absolute path.
 */
const _convertAbsolute = (path) => {
  try {
    // If the path is not defined or is an empty string, end early and return 'undefined'
    if (typeof path === "undefined" || path === "") return;

    // As Windows supports backslashes, but Linux only supports forward-slashes
    // So, check for the OS and change their slashes to their respective OS
    let replace = { before: "\\", after: "/" };
    if (process.platform === "win32") {
      replace.before = "/";
      replace.after = "\\";
    }

    // Replace all respective slashes depending on the OS (the check is above)
    path = path.replaceAll(replace.before, replace.after);

    // Pre-define the path name
    let pathName = "";

    // If the path is not already an absolute path, convert it to one
    if (!isAbsolute(path)) {
      // Add the the current working to the start, and a slash, and then the path
      pathName = `${process.cwd()}${replace.after}${path}`;
    } else {
      // If the path is already an absolute path, leave it
      pathName = path;
    }

    // Make sure to replace all slashes with their respective OS slashes, and any double-slashes to single slashes
    return pathName
      .replaceAll(replace.before, replace.after)
      .replaceAll("\\\\", "\\")
      .replaceAll("//", "/");
  } catch (err) {
    _fatalError(err);
  }
};

// Export the function
module.exports = _convertAbsolute;
