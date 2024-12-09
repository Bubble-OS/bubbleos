// Get modules
const chalk = require("chalk");
const sortKeys = require("sort-keys");
const { networkInterfaces } = require("os");

// Get functions
const _promptForYN = require("../functions/promptForYN");
const _fatalError = require("../functions/fatalError");

const userFriendlyMap = new Map([
  ["address", "IP Address"],
  ["netmask", "Net Mask"],
  ["family", "Family"],
  ["mac", "MAC Address"],
  ["internal", "Internal"],
  ["cidr", "CIDR"],
  ["scopeid", "Scope ID"],
]);

/**
 * Make the keys found from the object returned
 * from `os.networkInterfaces()` user-friendly
 * by capitalizing them and expanding them.
 *
 * Usage:
 *
 * ```js
 * _makeUserFriendly("address"); // Should return: "IP Address"
 * ```
 *
 * @param {string} network The key of the current `networkInterfaces()` key to transform.
 * @returns The 'friendlier' key.
 */
const _makeUserFriendly = (network) => userFriendlyMap.get(network.toLowerCase()) || network;

/**
 * Make a value friendly. Currently, this only converts booleans
 * from `true` and `false` to _Yes_ and _No_, respectively.
 *
 * Usage:
 *
 * ```js
 * _makeValueFriendly(true); // Should return: "Yes"
 * ```
 *
 * If the checks failed, it will just re-return the argument
 * passed in.
 *
 * @param {any} value The value to convert.
 * @returns The converted value.
 */
const _makeValueFriendly = (value) => (typeof value === "boolean" ? (value ? "Yes" : "No") : value);

/**
 * Get network information from the local machine.
 * For use in the BubbleOS CLI only.
 *
 * Usage:
 *
 * ```js
 * ifnet(); // No arguments
 * ```
 *
 * @param  {...string} args Arguments to modify the behavior of `ifnet`, however, none are yet available.
 */
const ifnet = (...args) => {
  try {
    // Get the network interfaces once
    const interfaces = sortKeys(networkInterfaces(), { deep: true });
    const keys = Object.keys(interfaces);

    if (!keys.length) {
      console.log(chalk.yellow("No active network interfaces found.\n"));
      return;
    }

    // Display each network interface and its properties
    for (const [name, details] of Object.entries(interfaces)) {
      console.log(chalk.red.underline.bold(name));
      details.forEach((detail) => {
        for (const [key, value] of Object.entries(detail)) {
          console.log(`  ${_makeUserFriendly(key)}: ${chalk.bold(_makeValueFriendly(value))}`);
        }
        console.log(); // Add a newline between entries
      });
    }
  } catch (err) {
    _fatalError(err);
  }
};

// Export the function
module.exports = ifnet;
