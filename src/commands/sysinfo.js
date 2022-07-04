const chalk = require("chalk");

const sysinfo = (all) => {
  console.log(`${chalk.bold("BASIC INFORMATION")}`);

  console.log(`Operating System: ${chalk.bold(process.platform)}`);
  console.log(`Architecture: ${chalk.bold(process.arch)}`);

  if (!all) {
    console.log();

    console.log("Use -a to see all information.");

    console.log();
    return;
  }

  console.log(`\n${chalk.bold("ENVIRONMENT VARIABLES")}`);

  for (const [key, value] of Object.entries(process.env)) {
    console.log(`${chalk.green(key)}: ${value}`);
  }

  console.log();
};

module.exports = sysinfo;
