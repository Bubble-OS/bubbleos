const _fatalError = require("./fatalError");

/**
 * Converts a size in bytes to bytes, kilobytes, megabytes and gigabytes.
 *
 * @param {number} bytes The bytes to convert.
 * @param {number} decimals Optional; determines how many decimals to keep in each value. Defaults to `3`.
 * @returns An object containing the converted sizes in bytes, kilobytes, megabytes and gigabytes, each as a number.
 */
const _convertSize = (bytes, decimals = 3) => {
  try {
    // Convert bytes to kilobytes, megabytes, and gigabytes and change decimal places
    const kilobytes = parseFloat((bytes / 1024).toFixed(decimals));
    const megabytes = parseFloat((kilobytes / 1024).toFixed(decimals));
    const gigabytes = parseFloat((megabytes / 1024).toFixed(decimals));

    return {
      bytes,
      kilobytes,
      megabytes,
      gigabytes,
    };
  } catch (err) {
    _fatalError(err);
  }
};

module.exports = _convertSize;
