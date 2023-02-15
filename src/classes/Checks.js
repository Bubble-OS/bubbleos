const fs = require("fs");

const { isText } = require("istextorbinary");

/**
 * Validate multiple aspects of BubbleOS.
 *
 * @deprecated Unused right now
 */
class Checks {
  constructor() {}

  /**
   * Validate parameters that were passed from a command.
   *
   * Returns `true` if the `length` is not `0` or the parameters does not include `undefined`. Otherwise, it returns `false`.
   *
   * @param  {...string | undefined} params The list of parameters the user entered.
   * @returns Either `true` if there are valid parameters or `false` if the check failed.
   */
  static validateParams(...params) {
    if (params.length === 0) return false;
    else if (params.includes(undefined)) return false;
    else return true;
  }

  /**
   * Validate multiple files' existance.
   *
   * Returns an array of booleans; `true` for if the respective exists, or `false` for if the respective does not exist.
   *
   * @param {...fs.PathLike | string} files The files to validate.
   * @returns An array of booleans.
   */
  static validateExistance(...files) {
    const existArr = [];
    files.forEach((file) => {
      existArr.push(fs.existsSync(file));
    });
    return existArr;
  }

  /**
   * Validate the encoding of multiple files.
   *
   * Returns an array of booleans; `true` for if the respective is a text file, or `false` for if the respective is not a text file.
   *
   * @param {...fs.PathLike | string} files The list of files to validate.
   * @returns An array of booleans.
   */
  static validateEncoding(...files) {
    const encodeArr = [];
    files.forEach((file) => {
      existArr.push(isText(file, fs.readFileSync(file, { flag: "r" })));
    });
    return encodeArr;
  }

  /**
   * Validate the type (e.g. is file or directory) of multiple paths.
   *
   * Returns an array of booleans; `true` for if the respective is a directory, or `false` for if the respective is a file.
   *
   * @param {...fs.PathLike | string} paths The list of paths to validate.
   * @returns An array of booleans.
   */
  static validateType(...paths) {
    const typeArr = [];
    paths.forEach((path) => {
      typeArr.push(fs.lstatSync(path).isDirectory());
    });
    return typeArr;
  }

  /**
   * Validate the permissions of multiple paths.
   *
   * Returns an array of booleans; `true` for if the respective is accessible, or `false` for if the respective is not accessible.
   *
   * @param {...fs.PathLike | string} paths The list of paths to validate.
   * @returns An array of booleans.
   */
  static validatePerms(...paths) {
    const permsArr = [];
    paths.forEach((path) => {
      try {
        fs.accessSync(path, fs.constants.R_OK | fs.constants.W_OK);
        permsArr.push(true);
      } catch (err) {
        permsArr.push(false);
      }
    });
    return permsArr;
  }
}

module.exports = Checks;
