const os = require("os");

/**
 * Get the friendly version of the OS from `os.type()`.
 *
 * @returns The friendly name.
 */
const _friendlyOS = () => {
  switch (os.type()) {
    // Darwin is another name for 'macOS', which many don't know
    case "Darwin":
      return "macOS";
    // BubbleOS does not work on Windows 9x :)
    case "Windows_NT":
      return "Windows";
    // If it does not match, return the default (in the case of Linux, for example)
    default:
      return os.type();
  }
};

module.exports = _friendlyOS;
