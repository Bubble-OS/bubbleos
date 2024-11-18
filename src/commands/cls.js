/**
 * Clears the entire standard output.
 *
 * Usage:
 *
 * ```js
 * cls(); // No arguments required!
 * ```
 *
 * This command used to use `console.clear()`, but on Windows,
 * it only used to clear the visible standard output, but not
 * the entire screen, unlike Linux. This was fixed by writing
 * `\033c` to the _stdout_ instead, which works cross-platform.
 */
const cls = () => {
  try {
    process.stdout.write("\x1bc");
  } catch (err) {
    _fatalError(err);
  }
};

// Export the function
module.exports = cls;
