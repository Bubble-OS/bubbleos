const { isAbsolute } = require("path");

/**
 * Convert a path to an absolute path, unless the path is already an absolute path.
 *
 * Example of a relative path: `./test.txt`
 *
 * Example of an abolute path: `D:\a\directory\with\a\file\test.txt`
 *
 * @param {string} path The absolute/relative path to convert.
 * @returns A string of the new absolute path.
 */
const _convertAbsolute = (path) => {
  let replace = { before: "\\", after: "/" };
  if (process.platform === "win32") {
    replace.before = "/";
    replace.after = "\\";
  }

  path = path.replaceAll(replace.before, replace.after);

  const isAbsolutePath = isAbsolute(path);
  let pathName = "";

  if (!isAbsolutePath) {
    pathName = `${process.cwd()}${replace.after}${path}`;
  } else {
    pathName = path;
  }

  return pathName.replaceAll(replace.before, replace.after).replaceAll("//", "/");
};

module.exports = _convertAbsolute;
