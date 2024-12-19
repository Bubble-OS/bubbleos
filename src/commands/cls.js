const _fatalError = require("../functions/fatalError");

const Verbose = require("../classes/Verbose");

/**
 * Clears the entire standard output.
 */
const cls = (...args) => {
  try {
    // Note console.clear() only clears visible stdout
    // on Windows, therefore this works better
    process.stdout.write("\x1bc");
    Verbose.custom("Cleared screen.");
  } catch (err) {
    Verbose.fatalError();
    _fatalError(err);
  }
};

module.exports = cls;
