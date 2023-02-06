const chalk = require("chalk");

const os = require("os");

const sysinfo = (all) => {
  const friendlyOS = () => {
    let friendlyName = os.type();
    if (os.type() === "Darwin") {
      friendlyName = "macOS";
    } else if (os.type() === "Windows_NT") {
      friendlyName = "Windows";
    }
    return friendlyName;
  };

  console.log(`${chalk.bold.underline("BASIC INFORMATION")}`);

  console.log(`Operating System: ${chalk.bold(friendlyOS())}`);
  console.log(`Architecture: ${chalk.bold(process.arch)}`);

  if (!all) {
    console.log(chalk.cyan(`\nUse ${chalk.italic("-a")} to see all information.\n`));
    return;
  }

  console.log(`\n${chalk.bold.underline("ENVIRONMENT VARIABLES")}`);

  for (const [key, value] of Object.entries(process.env)) {
    console.log(`${chalk.green(key)}: ${value}`);
  }

  console.log();
};

module.exports = sysinfo;
