const chalk = require("chalk");
const sortKeys = require("sort-keys");

const { networkInterfaces } = require("os");

const ifnet = () => {
  const makeUserFriendly = (network) => {
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

  const makeValueFriendly = (value) => {
    if (typeof value === "boolean" && value) value = "Yes";
    else if (typeof value === "boolean") value = "No";
    return value;
  };

  const netInts = {
    func: sortKeys(networkInterfaces(), { deep: true }),
    keys: Object.keys(networkInterfaces()),
    values: Object.values(networkInterfaces()),
  };

  if (!netInts.keys.length) {
    console.log(chalk.yellow("No active network interfaces found.\n"));
    return;
  }

  for (let value in netInts.func) {
    console.log(chalk.red.underline.bold(`${value}`));

    for (let ele of netInts.func[value]) {
      for (let network in ele) {
        console.log(
          `  ${makeUserFriendly(network)}: ${chalk.bold(makeValueFriendly(ele[network]))}`
        );
      }

      console.log();
    }
  }
};

module.exports = ifnet;
