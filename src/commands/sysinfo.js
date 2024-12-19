const os = require("os");
const chalk = require("chalk");
const osName = require("os-name");

const { GLOBAL_NAME } = require("../variables/constants");

const _convertSize = require("../functions/convSize");
const _friendlyOS = require("../functions/friendlyOS");
const _fatalError = require("../functions/fatalError");

const ConfigManager = require("../classes/ConfigManager");
const Verbose = require("../classes/Verbose");

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
 * Formula used: `(t - f) > (t / 2)`
 *
 * @param {string | number} mem The memory to display in the color.
 * @returns A string with the colored string.
 */
const _determineColor = (mem) => {
  // If the total memory minus the free memory is greater than the total memory divided by two,
  // it is using more than half of the total memory, hence, use a red color, else, use green.
  if (os.totalmem() - os.freemem() > os.totalmem() / 2) return chalk.red(mem);
  else return chalk.green(mem);
};

/**
 * Fixes issue where BubbleOS reports Windows 11 systems as Windows 10 ([#7](https://github.com/arnavt78/bubbleos/issues/7)).
 *
 * @param {string} currentOSName The current name of the OS.
 * @returns The name of the OS.
 */
const _fixVersion = (currentOSName) =>
  currentOSName === "Windows 10" && parseInt(os.release().split(".").pop(), 10) >= 21370
    ? "Windows 11"
    : currentOSName;

/**
 * Get system information about the computer from
 * the BubbleOS CLI shell.
 *
 * Get lots of information about the local computer
 * in this command. You can also filter it using
 * arguments, which are listed below.
 *
 * Available arguments:
 * - `-c`: Display computer information.
 * - `-u`: Display user information.
 * - `-s`: Display system resources.
 * - `-a`: Display advanced information.
 * - `-e`: Display environment variables.
 * - `--all`: Display all system information that is available.
 *
 * @param {...string} args Arguments to modify the behavior of `sysinfo`.
 */
const sysinfo = (...args) => {
  try {
    Verbose.initArgs();
    const computerInfo = args?.includes("-c");
    const userInfo = args?.includes("-u");
    const sysResource = args?.includes("-s");
    const advancedInfo = args?.includes("-a");
    const envVars = args?.includes("-e");

    const all = args?.includes("--all");

    // In case no arguments were passed to modify what was shown, show that
    const defaultDisplay =
      !computerInfo && !userInfo && !sysResource && !advancedInfo && !envVars && !all;

    // If the user either requested everything, just the computer info, or the default display
    if (all || computerInfo || defaultDisplay) {
      Verbose.custom("Showing computer information...");
      console.log(`${chalk.bold.underline("Computer Information")}`);

      console.log(`Full OS name: ${chalk.italic(_fixVersion(osName()))}`);
      console.log(`Operating system: ${chalk.italic(_friendlyOS())}`);
      console.log(`Release: ${chalk.italic(os.release())}`);
      console.log(`Architecture: ${chalk.italic(process.arch)}`);
      console.log(`Computer name: ${chalk.italic(os.hostname())}`);
      console.log(`Locale: ${chalk.italic(Intl.DateTimeFormat().resolvedOptions().locale)}`);

      console.log();
    }

    // If the user either requested everything, just the user info, or the default display
    if (all || userInfo || defaultDisplay) {
      Verbose.custom("Showing user information...");
      console.log(`${chalk.bold.underline("User Information")}`);

      const { gid, homedir, shell, uid, username } = os.userInfo();

      console.log(`Username: ${chalk.bold(username)}`);
      console.log(`Home directory: ${chalk.bold(homedir)}`);
      console.log(`Temporary directory: ${chalk.bold(os.tmpdir())}`);

      // If the OS is Windows, GID, shell and UID are -1/null; so this is only shown to operating systems other than Windows
      if (process.platform !== "win32") {
        console.log(`GID (group identifier): ${chalk.bold(gid)}`);
        console.log(`UID (user identifier): ${chalk.bold(uid)}`);
        console.log(`Shell: ${chalk.bold(shell)}`);
      }

      console.log();
    }

    // If the user either requested everything, just the system resources, or the default display
    if (all || sysResource || defaultDisplay) {
      Verbose.custom("Showing system resources...");
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

      const uptime = _convertTime(os.uptime(), 0).recommended;
      console.log(`System uptime: ${chalk.italic(`${uptime.value} ${uptime.type}`)}`);

      console.log();
    }

    // If the user either requested everything or the advanced info
    if (all || advancedInfo) {
      Verbose.custom("Showing advanced information...");
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
      Verbose.custom("Showing environment variables...");
      console.log(`${chalk.bold.underline("Environment Variables")}`);

      // Get the keys and values of all environment variables
      for (const [key, value] of Object.entries(process.env)) {
        console.log(`${chalk.green(key)}: ${value}`);
      }

      console.log();
    }

    const config = new ConfigManager();

    if (defaultDisplay && !config.getConfig().sysinfoTip) {
      Verbose.custom("Showing system information tip...");
      console.log(
        chalk.yellow.italic(
          `Tip: To get more system information, run ${chalk.italic("'sysinfo --all'")}.\n`
        )
      );

      Verbose.custom("Adding tip shown to configuration file...");
      config.addData({ sysinfoTip: true });
    }
  } catch (err) {
    Verbose.fatalError();
    _fatalError(err);
  }
};

module.exports = sysinfo;
