const _fatalError = require("./fatalError");

/**
 * Parse double-quote paths and arguments to allow
 * the user to specify spaces when needed.
 *
 * @param {string[]} arr The array to parse the double-quotes out of.
 * @returns The array with the parsed elements, including removing the double-quotes.
 */
const _parseDoubleQuotes = (arr) => {
  try {
    const str = arr?.join(" ");
    const matches = str?.match(/"([^"]*)"(?:[^"]*"([^"]*)")?/);

    if (str?.trim() === "" || typeof str === "undefined") return [];

    if (matches && matches.length === 3) {
      const quotesText = matches.filter(Boolean);
      quotesText.shift();

      return quotesText;
    } else return str?.split(" ");
  } catch (err) {
    _fatalError(err);
  }
};

module.exports = _parseDoubleQuotes;
