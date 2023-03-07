// Get modules
const chalk = require("chalk");

// Get functions
const _fatalError = require("../functions/fatalError");

/**
 * Convert the time passed in to a twelve-hour format.
 *
 * @param {Date} time The time to convert.
 */
const _convertTime = (time) => {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) {
    // Remove full string match value
    time = time.slice(1);

    // Set AM/PM and adjust hours
    time[5] = +time[0] < 12 ? " AM" : " PM";
    time[0] = +time[0] % 12 || 12;
  }

  // Return adjusted time or original string
  return time.join("");
};

/**
 * Show the current time from the local machine.
 * For use in the BubbleOS CLI only.
 *
 * Usage:
 *
 * ```js
 * time(); // Arguments are also accepted! (unintended alliteration)
 * ```
 *
 * By default, this command shows the time in 12-hour
 * time, however, this can be changed using an
 * argument.
 *
 * There is a bug in Linux/macOS where the time
 * will not show the AM/PM, even when viewing it
 * as twelve-hour time.
 *
 * Available arguments:
 * - `-24`: Show the time in 24-hour time.
 *
 * @param  {...string} args Arguments to modify the behaviour of `time`.
 */
const time = (...args) => {
  try {
    // If the user wants the time in 24-hour format instead of 12-hour
    const isTwelveHours = !(args.includes("-24") || args.includes("/24"));

    // Get the time
    const rawTime = new Date();
    const time = `${rawTime.getHours()}:${rawTime.getMinutes()}:${rawTime.getSeconds()}`;

    // If the user wants the time in 24-hours, show it in raw format, else, convert it
    if (isTwelveHours) console.log(chalk.bold(_convertTime(time)));
    else console.log(chalk.bold(time));

    // Newline and return
    console.log();
    return;
  } catch (err) {
    _fatalError(err);
  }
};

// Export the functions
module.exports = time;
