const os = require("os");

const _fatalError = require("./fatalError");

/**
 * Get the friendly version of the OS from `os.type()`.
 *
 * @returns The friendly name.
 */
const _friendlyOS = () => {
  try {
    switch (os.type()) {
      case "Darwin":
        return "macOS";
      case "Windows_NT":
        return "Windows";
      default:
        // If it does not match, return the default (in the case of Linux, for example)
        return os.type();
    }
  } catch (err) {
    _fatalError(err);
  }
};

module.exports = _friendlyOS;
