const { GLOBAL_NAME } = require("../variables/constants");

const exit = (...args) => {
  console.log(`Exiting the ${GLOBAL_NAME} shell...\n`);

  if (args.includes("-c") || args.includes("/c")) process.stdout.write("\033c");

  process.exit(0);
};

module.exports = exit;
