/**
 * Replace all spaces in a string, depending on the value of `spaceChar`.
 *
 * Usage:
 *
 * ```js
 * _replaceSpaces("Hello*sWorld!"); // Should return: "Hello World!"
 * ```
 *
 * @param {string | any} text A string (or any value, but it will be converted to a string) to replace the spaces in.
 * @param {string} spaceChar _Optional:_ The character to find to replace. Defaults to `*s`.
 * @param {string} space _Optional:_ The space to replace it with. Defaults to a one-width space (` `).
 * @returns The text with all spaces replaced.
 */
const _replaceSpaces = (text, spaceChar = "*s", space = " ") => {
  // If the text is not defined or is an empty string, return 'undefined'
  if (typeof text === "undefined" || text === "") return;
  // Replace all space characters with an actual space
  return text.replaceAll(spaceChar, space);
};

// Export the function
module.exports = _replaceSpaces;
