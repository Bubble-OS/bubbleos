import { isAbsolute } from "path";

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
  const isAbsolutePath = isAbsolute(path);
  let pathName = "";

  if (!isAbsolutePath) {
    pathName = `${process.cwd()}\\${path}`;
  } else {
    pathName = path;
  }

  return pathName;
};

export default _convertAbsolute;
