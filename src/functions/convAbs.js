const { isAbsolute } = require("path");

const _fatalError = require("./fatalError");

/**
 * Convert a path to an absolute path, unless the path is already an absolute path.
 *
 * Example of a relative path: `./test.txt`
 *
 * Example of an absolute path: `D:\a\directory\with\a\file\test.txt`
 *
 * @param {string} path The absolute/relative path to convert.
 * @returns A string of the new absolute path.
 */
const _convertAbsolute = (path) => {
  try {
    if (typeof path === "undefined" || path === "") return;

    // As Windows supports backslashes, but Linux only supports forward-slashes
    // So, check for the OS and change their slashes to their respective OS
    let replace = { before: "\\", after: "/" };
    if (process.platform === "win32") {
      replace.before = "/";
      replace.after = "\\";
    }

    path = path.replaceAll(replace.before, replace.after);
    let pathName = "";

    // If the path is not already an absolute path, convert it to one
    if (!isAbsolute(path)) {
      pathName = `${process.cwd()}${replace.after}${path}`;
    } else {
      pathName = path;
    }

    // Replace all slashes with their respective OS slashes, and any double-slashes to single slashes
    return pathName
      .replaceAll(replace.before, replace.after)
      .replaceAll("\\\\", "\\")
      .replaceAll("//", "/");
  } catch (err) {
    _fatalError(err);
  }
};

module.exports = _convertAbsolute;
