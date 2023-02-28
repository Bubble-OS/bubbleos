const fs = require("fs");

const { isText } = require("istextorbinary");

const _fatalError = require("../functions/fatalError");

/**
 * Validate multiple aspects of BubbleOS.
 */
class Checks {
  constructor(param) {
    this.param = param;
  }

  /**
   * Check if the parameter is `undefined`.
   *
   * Returns `true` if the parameter is `undefined`, else, returns `false`.
   *
   * @returns Either `true` if the parameter is `undefined`, else, returns `false`.
   */
  paramUndefined() {
    if (Array.isArray(this.param)) return this.param.length === 0;
    return typeof this.param === "undefined";
  }

  /**
   * Check if the path exists.
   *
   * Returns `true` if the path exists, else, returns `false`.
   *
   * @returns Either `true` if the path exists, else, returns `false`.
   */
  doesExist() {
    try {
      return fs.existsSync(this.param);
    } catch (err) {
      _fatalError(err);
    }
  }

  /**
   * Check if the path is a text file.
   *
   * Returns `true` if the file is a text file, else, returns `false`.
   *
   * @returns Either `true` if the file is a text file, else, returns `false`.
   */
  validEncoding() {
    try {
      isText(this.param, fs.readFileSync(this.param, { flag: "r" }));
    } catch (err) {
      _fatalError(err);
    }
  }

  /**
   * Check if the path is a directory.
   *
   * Returns `true` if the path is a directory, else, returns `false`.
   *
   * @returns Either `true` if the path is a directory, else, returns `false`.
   */
  validateType() {
    try {
      return fs.lstatSync(this.param).isDirectory();
    } catch (err) {
      _fatalError(err);
    }
  }
}

module.exports = Checks;
