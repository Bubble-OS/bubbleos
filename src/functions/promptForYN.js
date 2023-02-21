const { keyInYN } = require("readline-sync");

const _promptForYN = (message) => {
  if (!keyInYN(message)) return false;
  else return true;
};

module.exports = _promptForYN;
