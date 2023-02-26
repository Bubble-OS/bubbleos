const os = require("os");

const chalk = require("chalk");

const _convertSize = require("../functions/convSize");
const _fatalError = require("../functions/fatalError");

const _convertTime = (seconds, decimals = 2) => {
  const minutes = parseFloat((seconds / 60).toFixed(decimals));
  const hours = parseFloat((minutes / 60).toFixed(decimals));
  const days = parseFloat((hours / 24).toFixed(decimals));

  const recommended =
    parseFloat(days.toFixed(0)) !== 0
      ? { value: days, type: days === 1 ? "day" : "days" }
      : parseFloat(hours.toFixed(0)) !== 0
      ? { value: hours, type: hours === 1 ? "hour" : "hours" }
      : parseFloat(minutes.toFixed(0)) !== 0
      ? { value: minutes, type: minutes === 1 ? "minute" : "minutes" }
      : { value: seconds, type: seconds === 1 ? "second" : "seconds" };

  return {
    recommended,
    seconds,
    minutes,
    hours,
    days,
  };
};

const _determineColor = (mem) => {
  if (os.freemem() < os.totalmem() / 2) {
    return chalk.red(mem);
  } else {
    return chalk.green(mem);
  }
};

const _friendlyOS = () => {
  let friendlyName = os.type();
  if (friendlyName === "Darwin") {
    friendlyName = "macOS";
  } else if (friendlyName === "Windows_NT") {
    friendlyName = "Windows";
  }
  return friendlyName;
};

const sysinfo = (...args) => {
  try {
    const rmTip = args?.includes("--rm-tip") || args?.includes("/rm-tip");

    const computerInfo = args?.includes("-c") || args?.includes("/c");
    const sysResource = args?.includes("-r") || args?.includes("/r");
    const advancedInfo = args?.includes("-a") || args?.includes("/a");
    const envVars = args?.includes("-e") || args?.includes("/e");
    const all = args?.includes("--all") || args?.includes("/all");

    const defaultDisplay =
      !computerInfo && !sysResource && !advancedInfo && !envVars && !all ? true : false;

    if (all || computerInfo || defaultDisplay) {
      console.log(`${chalk.bold.underline("Computer Information")}`);

      console.log(`Operating system: ${chalk.italic(_friendlyOS())}`);
      console.log(`Release: ${chalk.italic(os.release())}`);
      console.log(`Architecture: ${chalk.italic(process.arch)}`);
      console.log(`Computer name: ${chalk.italic(os.hostname())}`);

      console.log();
    }

    if (all || sysResource || defaultDisplay) {
      console.log(`${chalk.bold.underline("System Resources")}`);

      console.log(
        `Memory usage: ${chalk.italic(
          _determineColor(
            `${_convertSize(os.freemem(), 2).gigabytes}GB/${
              _convertSize(os.totalmem(), 2).gigabytes
            }GB`
          )
        )}`
      );
      console.log(`CPU cores: ${chalk.italic(os.cpus().length)}`);

      const uptime = _convertTime(os.uptime()).recommended;
      console.log(`System uptime: ${chalk.italic(`${uptime.value} ${uptime.type}`)}`);

      console.log();
    }

    if (all || advancedInfo) {
      console.log(`${chalk.bold.underline("Advanced Information")}`);

      console.log(`NULL device: ${chalk.italic(os.devNull)}`);
      console.log(
        `CPU endianness: ${chalk.italic(
          os.endianness() === "BE" ? "BE (big endian)" : "LE (little endian)"
        )}`
      );
      try {
        console.log(
          `Estimated default parallelism amount (program): ${chalk.italic(
            os.availableParallelism()
          )}`
        );
      } catch (err) {
        console.log(`Estimated default parallelism amount (program): ${chalk.italic("N/A")}`);
      }

      console.log();
    }

    if (all || envVars) {
      console.log(`\n${chalk.bold.underline("Environment Variables")}`);

      for (const [key, value] of Object.entries(process.env)) {
        console.log(`${chalk.green(key)}: ${value}`);
      }

      console.log();
    }

    if (defaultDisplay && !rmTip) {
      console.log(
        chalk.yellow.italic(
          `Tip: To get more system information, run ${chalk.italic("'sysinfo --all'")}.\n`
        )
      );
    }
  } catch (err) {
    _fatalError(err);
  }
};

module.exports = sysinfo;
