const { red: chalkRed, italic: chalkItalic } = require("chalk");

const _errorInterpret = require("./functions/errorInt");

/**
 * First error handler for the input from the main prompt.
 *
 * _Note: As of `v0.2.3`, the unrecognized command checking has been moved to the `index.js` file._
 *
 * @param {boolean} isEmpty If the input is empty or not.
 */
const error = (isEmpty) => {
  if (isEmpty) {
    _errorInterpret("0x0000");
  }
};

module.exports = error;
