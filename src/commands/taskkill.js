const chalk = require("chalk");

const taskkill = (pid) => {
  if (typeof pid === "undefined") {
    console.log(`Please enter a PID to kill. Example: ${chalk.yellow("taskkill 1234")}.`);
    console.log();

    return;
  }

  console.log(`Killing PID ${chalk.yellow(pid)}...`);

  process.kill(Number(pid));

  console.log(`Successfully killed process ${chalk.green(pid)}.`);

  console.log();
};

module.exports = taskkill;
