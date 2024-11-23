const _fatalError = require("./fatalError");

/**
 * Parse double-quote paths and arguments to allow
 * the user to specify spaces when needed.
 *
 * Note that for multiple arguments, either
 * put double quotes between all arguments, or
 * none, depending on the use case.
 *
 * @example
 *
 * ```js
 * _parseDoubleQuotes([`"hello world" "yes hello"`]); // Returns: ["hello world", "yes hello"]
 * _parseDoubleQuotes([`hello world`]); // Returns: ["hello", "world"]
 * ```
 *
 * @param {string[]} arr The array to parse the double-quotes out of.
 * @returns The array with the parsed elements, including removing the double-quotes.
 */
const _parseDoubleQuotes = (arr) => {
  try {
    // Join the array with spaces, which is what the array was originally seperated by
    const str = arr?.join(" ");
    // Initialize the RegExp
    const regex = /"([^"]*)"(?:[^"]*"([^"]*)")?/;
    // Get the matches
    const matches = str?.match(regex);

    // If the string is empty, return 'undefined'
    if (str?.trim() === "" || typeof str === "undefined") return [];

    // If there are matches
    if (matches && matches.length === 3) {
      const quotesText = matches.filter(Boolean);
      // Remove the first element; unneeded
      quotesText.shift();

      return quotesText;
    } else {
      // If there were no double-quotes, just return the original array
      return str?.split(" ");
    }
  } catch (err) {
    _fatalError(err);
  }
};

// Export the function
module.exports = _parseDoubleQuotes;
