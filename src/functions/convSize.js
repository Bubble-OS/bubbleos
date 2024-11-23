const _fatalError = require("./fatalError");

/**
 * Converts a size in bytes to bytes, kilobytes, megabytes and gigabytes.
 *
 * Usage:
 * ```js
 * _convertSize(100000); // Should return: { bytes: 100000, kilobytes: 100, megabytes: 0.1, gigabytes: 0 }
 * _convertSize(100000, 5); // Should return: { bytes: 100000, kilobytes: 100, megabytes: 0.1, gigabytes: 0.0001 }
 * ```
 *
 * @param {number} bytes The bytes to convert.
 * @param {number} decimals Optional; determines how many decimals to keep in each value. Defaults to `3`.
 * @returns An object containing the converted sizes in bytes, kilobytes, megabytes and gigabytes, each as a number.
 */
const _convertSize = (bytes, decimals = 3) => {
  try {
    // Convert bytes to kilobytes, megabytes, and gigabytes and change decimal places
    const kilobytes = parseFloat((bytes / 1000).toFixed(decimals));
    const megabytes = parseFloat((kilobytes / 1000).toFixed(decimals));
    const gigabytes = parseFloat((megabytes / 1000).toFixed(decimals));

    // Return all of them as an object
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

// Export the function
module.exports = _convertSize;
