const chalk = require("chalk");

const taskkill = (pid) => {
  if (typeof pid === "undefined") {
    console.log(`Please enter a PID to kill. Example: ${chalk.yellow("taskkill 1234")}.`);
    console.log();

    return;
  }

  console.log(`Killing PID ${chalk.yellow(pid)}...`);

  try {
    process.kill(Number(pid));
  } catch (err) {
    if (err.message.toLowerCase().includes("eperm")) {
      console.log(
        `You do not have permission to kill ${chalk.red(
          `${dir}`
        )}. Try running Bubble from an administrator account.`
      );
      console.log();
    } else {
      console.log(`${chalk.red(err.message)}.`);
      console.log();
    }

    return;
  }

  console.log(`Successfully killed process ${chalk.green(pid)}.`);

  console.log();
};

module.exports = taskkill;
