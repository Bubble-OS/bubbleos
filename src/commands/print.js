const _errorInterpret = require("../functions/errorInt");

/**
 * Print text to screen. Named `printText` instead of `print` to avoid naming collisions.
 *
 * @param {string} text The text to output.
 */
const printText = (text) => {
  if (!text) {
    _errorInterpret(30);
    return;
  }

  console.log(`${text}\n`);
};

module.exports = printText;
