const chalk = require("chalk");
const { networkInterfaces } = require("os");

const ifnet = () => {
  const makeUserFriendly = (network) => {
    network = network.toLowerCase();
    switch (network) {
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

  const netInts = {
    func: networkInterfaces(),
    keys: Object.keys(networkInterfaces()),
    values: Object.values(networkInterfaces()),
  };
  for (value in netInts.func) {
    console.log(chalk.red.underline.bold(`${value}`));

    for (ele of netInts.func[value]) {
      for (network in ele) {
        console.log(`    ${makeUserFriendly(network)}: ${chalk.bold(ele[network])}`);
      }

      console.log();
    }

    console.log();
  }
};

module.exports = ifnet;
