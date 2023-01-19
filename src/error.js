const { red: chalkRed, italic: chalkItalic } = require("chalk");

/**
 * First error handler for the input from the main prompt.
 *
 * _Note: As of `v0.2.3`, the unrecognized command checking has been moved to the `index.js` file._
 *
 * @param {boolean} isEmpty If the input is empty or not.
 */
const error = (isEmpty) => {
  if (isEmpty) {
    console.log(
      chalkRed(
        `Please enter a command. Type ${chalkItalic("help")} for a list of available commands.\n`
      )
    );
  }
};

module.exports = error;
