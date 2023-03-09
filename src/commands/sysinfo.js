// Get modules
const os = require("os");
const chalk = require("chalk");

// Get variables
const { GLOBAL_NAME } = require("../variables/constants");

// Get functions
const _convertSize = require("../functions/convSize");
const _fatalError = require("../functions/fatalError");

/**
 * Convert seconds to minutes, hours and days.
 *
 * The `recommended` value will check if the value
 * is `0`, going down from `days` to `seconds`. It
 * will also suffix the respective type in either
 * plural or singular form (in an object).
 *
 * @param {number} seconds The seconds to convert.
 * @param {number} decimals The number of decimal points to keep.
 * @returns An object containing all of the conversions.
 */
const _convertTime = (seconds, decimals = 2) => {
  // Convert seconds to minutes, hours and days using their respective mathematical conversion method
  const minutes = parseFloat((seconds / 60).toFixed(decimals));
  const hours = parseFloat((minutes / 60).toFixed(decimals));
  const days = parseFloat((hours / 24).toFixed(decimals));

  // Calculate the recommended value by checking if the value is 0, going from days to seconds.
  // It will also suffix the respective type in either plural or singular form (in an object).
  const recommended =
    parseFloat(days.toFixed(0)) !== 0
      ? { value: days, type: days === 1 ? "day" : "days" }
      : parseFloat(hours.toFixed(0)) !== 0
      ? { value: hours, type: hours === 1 ? "hour" : "hours" }
      : parseFloat(minutes.toFixed(0)) !== 0
      ? { value: minutes, type: minutes === 1 ? "minute" : "minutes" }
      : { value: seconds, type: seconds === 1 ? "second" : "seconds" };

  // Return as an object
  return {
    recommended,
    seconds,
    minutes,
    hours,
    days,
  };
};

/**
 * Determine the color depending on the percentage
 * of memory being used.
 *
 * Algebra used: `(t - f) > (t / 2)`
 *
 * @param {string | number} mem The memory to display in the color.
 * @returns A string with the colored string.
 */
const _determineColor = (mem) => {
  // Algebra: (t - f) > (t / 2)
  // If the total memory minus the free memory is greater than the total memory divided by two,
  // it is using more than half of the total memory, hence, use a red color, else, use green.
  if (os.totalmem() - os.freemem() > os.totalmem() / 2) {
    return chalk.red(mem);
  } else {
    return chalk.green(mem);
  }
};

/**
 * Get the friendly version of the OS from `os.type()`.
 *
 * @returns The friendly name.
 */
const _friendlyOS = () => {
  switch (os.type()) {
    // Darwin is another name for 'macOS', which many don't know
    case "Darwin":
      return "macOS";
    // BubbleOS does not work on Windows 9x :)
    case "Windows_NT":
      return "Windows";
    // If it does not match, return the default (in the case of Linux, for example)
    default:
      return os.type();
  }
};

/**
 * Get system information about the computer from
 * the BubbleOS CLI shell.
 *
 * Usage:
 *
 * ```js
 * sysinfo(); // (Filter) Arguments available!
 * ```
 *
 * Get lots of information about the local computer
 * in this command. You can also filter it using
 * arguments, which are listed below.
 *
 * Available arguments:
 * - `-c`: Display computer information.
 * - `-s`: Display system resources.
 * - `-a`: Display advanced information.
 * - `-e`: Display environment variables.
 * - `--all`: Display all system information that is available.
 *
 * @param  {...string} args Arguments to modify the behavior of `sysinfo`.
 */
const sysinfo = (...args) => {
  try {
    // Initialize arguments
    // Arguments to modify what is shown
    const computerInfo = args?.includes("-c") || args?.includes("/c");
    const sysResource = args?.includes("-s") || args?.includes("/s");
    const advancedInfo = args?.includes("-a") || args?.includes("/a");
    const envVars = args?.includes("-e") || args?.includes("/e");

    // Show all values
    const all = args?.includes("--all") || args?.includes("/all");
    // Remove the tip
    const rmTip = args?.includes("--rm-tip") || args?.includes("/rm-tip");

    // In case no arguments were passed to modify what was shown, show that
    const defaultDisplay = !computerInfo && !sysResource && !advancedInfo && !envVars && !all;

    // If the user either requested everything, just the computer info, or the default display
    if (all || computerInfo || defaultDisplay) {
      console.log(`${chalk.bold.underline("Computer Information")}`);

      console.log(`Operating system: ${chalk.italic(_friendlyOS())}`);
      console.log(`Release: ${chalk.italic(os.release())}`);
      console.log(`Architecture: ${chalk.italic(process.arch)}`);
      console.log(`Computer name: ${chalk.italic(os.hostname())}`);
      console.log(`Locale: ${chalk.italic(Intl.DateTimeFormat().resolvedOptions().locale)}`);

      console.log();
    }

    // If the user either requested everything, just the system resources, or the default display
    if (all || sysResource || defaultDisplay) {
      console.log(`${chalk.bold.underline("System Resources")}`);

      // Show the memory out of the total memory in the color designated
      console.log(
        `Memory usage: ${chalk.italic(
          _determineColor(
            `${_convertSize(os.totalmem() - os.freemem(), 2).gigabytes}GB/${
              _convertSize(os.totalmem(), 2).gigabytes
            }GB`
          )
        )}`
      );
      console.log(`CPU cores: ${chalk.italic(os.cpus().length)}`);

      // Uptime in the recommended time (seconds, minutes, hours or days)
      const uptime = _convertTime(os.uptime(), 0).recommended;
      console.log(`System uptime: ${chalk.italic(`${uptime.value} ${uptime.type}`)}`);

      console.log();
    }

    // If the user either requested everything or the advanced info
    if (all || advancedInfo) {
      console.log(`${chalk.bold.underline("Advanced Information")}`);

      console.log(`NULL device: ${chalk.italic(os.devNull)}`);
      console.log(
        `CPU endianness: ${chalk.italic(
          os.endianness() === "BE" ? "BE (big endian)" : "LE (little endian)"
        )}`
      );

      // On some operating systems, this value will throw an error if run
      console.log(
        `Estimated default parallelism amount (program): ${chalk.italic(
          typeof os.availableParallelism === "undefined" ? "N/A" : os.availableParallelism()
        )}`
      );
      console.log(
        `${GLOBAL_NAME} PID (process identification number): ${chalk.italic(process.pid)}`
      );

      console.log();
    }

    // If the user either requested everything or the environment vars
    if (all || envVars) {
      console.log(`${chalk.bold.underline("Environment Variables")}`);

      // Get the keys and values of all environment variables
      for (const [key, value] of Object.entries(process.env)) {
        console.log(`${chalk.green(key)}: ${value}`);
      }

      console.log();
    }

    // If the user didn't put any filters and they didn't not request a tip
    if (defaultDisplay && !rmTip) {
      console.log(
        chalk.yellow.italic(
          `Tip: To get more system information, run ${chalk.italic("'sysinfo --all'")}.\n`
        )
      );
    }
  } catch (err) {
    // Unknown error
    _fatalError(err);
  }
};

// Export the function
module.exports = sysinfo;
