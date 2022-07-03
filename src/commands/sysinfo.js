const chalk = require("chalk");

const sysinfo = () => {
  console.log(`Operating System: ${chalk.bold(process.platform)}`);
  console.log(`Architecture: ${chalk.bold(process.arch)}`);

  console.log();
};

module.exports = sysinfo;
