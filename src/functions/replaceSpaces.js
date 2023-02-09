/**
 * Replace all spaces in a string, depending on the value of `spaceChar`.
 *
 * @param {string | any} text A string (or any value, but it will be converted to a string) to replace the spaces in.
 * @param {string} spaceChar _Optional:_ The character to find to replace. Defaults to `%s`.
 * @param {string} space _Optional:_ The space to replace it with. Defaults to a one-width space (` `).
 * @returns
 */
const _replaceSpaces = (text, spaceChar = "/s", space = " ") => {
  if (typeof text !== "undefined") {
    return text.replace(new RegExp(spaceChar, "ig"), space);
  }
};

export default _replaceSpaces;
