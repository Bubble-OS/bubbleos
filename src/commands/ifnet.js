// Get modules
const chalk = require("chalk");
const sortKeys = require("sort-keys");
const { networkInterfaces } = require("os");

// Get functions
const _promptForYN = require("../functions/promptForYN");

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
const _makeUserFriendly = (network) => {
  // Check for each, and if it doesn't match any, just return it like usual
  switch (network.toLowerCase()) {
    case "address":
      return "IP Address";
    case "netmask":
      return "Net Mask";
    case "family":
      return "Family";
    case "mac":
      return "MAC Address";
    case "internal":
      return "Internal";
    case "cidr":
      return "CIDR";
    case "scopeid":
      return "Scope ID";
    default:
      return network;
  }
};

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
const _makeValueFriendly = (value) => {
  // If it is boolean, return the friendly version
  if (typeof value === "boolean" && value) return "Yes";
  else if (typeof value === "boolean") return "No";

  // If all checks failed, re-return the parameter
  return value;
};

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
 * Available arguments:
 * - `-y`: Automatically confirm the prompt.
 *
 * @param  {...string} args Arguments to modify the behavior of `ifnet`, however, none are yet available.
 */
const ifnet = (...args) => {
  const confirmShow = !(args?.includes("-y") || args?.includes("/y"));
  // Get the network interfaces and sort them, get the keys,
  // and get the values of them in the object (respectively)
  const netInts = {
    func: sortKeys(networkInterfaces(), { deep: true }),
    keys: Object.keys(networkInterfaces()),
    values: Object.values(networkInterfaces()),
  };

  // If there are no network interfaces
  if (!netInts.keys.length) {
    console.log(chalk.yellow("No active network interfaces found.\n"));
    return;
  }

  // If the user did not pass '-y', confirm that the network interfaces should be shown
  if (confirmShow) {
    if (
      !_promptForYN(
        `Displaying sensitive network information can be dangerous. Are you sure you want to view ALL ${netInts.keys.length} local network interfaces?`
      )
    ) {
      // Anything BUT 'y' will cancel the deletion process
      console.log(chalk.yellow("Process aborted.\n"));
      return;
    }

    // Newline
    console.log();
  }

  // Loop through the network interfaces
  for (let value in netInts.func) {
    // Show the name
    console.log(chalk.red.underline.bold(`${value}`));

    // Loop through the parts
    for (let ele of netInts.func[value]) {
      // Loop through each of THOSE parts :)
      for (let network in ele) {
        // Log the friendly name and the friendly value
        console.log(
          `  ${_makeUserFriendly(network)}: ${chalk.bold(_makeValueFriendly(ele[network]))}`
        );
      }

      // Log a newline
      console.log();
    }
  }

  return;
};

// Export the function
module.exports = ifnet;
