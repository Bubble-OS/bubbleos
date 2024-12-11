const chalk = require("chalk");
const lockSystem = require("lock-system");

const { GLOBAL_NAME } = require("../variables/constants");

const _friendlyOS = require("../functions/friendlyOS");
const _fatalError = require("../functions/fatalError");

const Errors = require("../classes/Errors");
const InfoMessages = require("../classes/InfoMessages");

const lock = (...args) => {
  try {
    lockSystem();
    InfoMessages.success(`${GLOBAL_NAME} has successfully locked ${_friendlyOS()}!\n`);
    return;
  } catch (err) {
    if (err.message.toLowerCase().includes("unsupported os")) {
      Errors.invalidOS("Windows, macOS and/or Linux");
      return;
    } else if (err.message.toLowerCase().includes("no applicable command found")) {
      InfoMessages.error(
        "Locking the OS failed. Please consider installing xdg-screensaver, gnome-screensaver, cinnamon-screensaver, or dm-tool, and try again."
      );
      return;
    }
    _fatalError(err);
  }
};

module.exports = lock;
