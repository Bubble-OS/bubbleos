const os = require("os");

// Get variables
const { GLOBAL_NAME } = require("../variables/constants");

// Get functions
const _startupError = require("./startupError");

const startupChecks = () => {
  if (process.arch !== "x64")
    _startupError(
      `${GLOBAL_NAME} can only run on the x64 processor architecture. Please use a device with a processor that supports the x64 architecture.`,
      false
    );

  if (process.platform === "win32" && /^6\.(0|1|2|3)/.test(os.release())) {
    _startupError(
      `${GLOBAL_NAME} cannot run on Windows 8.1 and below due to security reasons. Please use a device which runs Windows 10 LTSC and later.`,
      false
    );
  }
};

module.exports = startupChecks;
