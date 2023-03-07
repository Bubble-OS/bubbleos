// Get modules
const fs = require("fs");
const { isText } = require("istextorbinary");

// Get functions
const _fatalError = require("../functions/fatalError");

/**
 * Validate multiple aspects of BubbleOS.
 */
class Checks {
  /**
   * Validate multiple aspects of BubbleOS.
   *
   * @param {string | number | any[] | undefined} param The parameter to be used in the validations.
   */
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
    // If the parameter is an array
    if (Array.isArray(this.param)) return this.param.length === 0;
    // Else, if the parameter is not defined
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
      // Check if the path exists
      return fs.existsSync(this.param);
    } catch (err) {
      // Unknown error
      _fatalError(err);
    }
  }

  /**
   * Check if the path is a text file.
   *
   * Returns `true` if the file is a text file, else, returns `false` (also returns `false` if the path does not exist or is a directory).
   *
   * @returns Either `true` if the file is a text file, else, returns `false`.
   */
  validEncoding() {
    try {
      // Check if the path exists or isn't a directory first
      if (!fs.existsSync(this.param) || fs.lstatSync(this.param).isDirectory()) return false;
      // Check if the path is a text file
      return isText(this.param, fs.readFileSync(this.param, { flag: "r" }));
    } catch (err) {
      // Unknown error
      _fatalError(err);
    }
  }

  /**
   * Check if the path is a directory.
   *
   * Returns `true` if the path is a directory, else, returns `false` (also returns `false` if the path does not exist).
   *
   * @returns Either `true` if the path is a directory, else, returns `false`.
   */
  validateType() {
    try {
      // Check if the path exists
      if (!fs.existsSync(this.param)) return false;
      // Return if the path is a directory or not
      return fs.lstatSync(this.param).isDirectory();
    } catch (err) {
      // Unknown error
      _fatalError(err);
    }
  }
}

// Export the class
module.exports = Checks;
