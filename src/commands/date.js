// Import modules
const chalk = require("chalk");

// Import functions
const _fatalError = require("../functions/fatalError");

const Verbose = require("../classes/Verbose");

/**
 * All of the days of the week.
 */
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
/**
 * All of the months of the year.
 */
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Show the current date from the local system to
 * display in BubbleOS using the `date` command.
 *
 * Usage:
 *
 * ```js
 * date(); // No arguments needed!
 * ```
 *
 * This command will output to the _stdout_ the
 * 'friendly' date, as well as the 'slash' date.
 */
const date = (...args) => {
  try {
    // Make a new date
    Verbose.custom("Getting current date...");
    const date = new Date();

    /**
     * The friendly date, that will have either a _-st_, _-nd_, _-rd_, or _-th_ suffix.
     */
    Verbose.custom("Creating user-friendly date...");
    const friendlyDate =
      date.getDate() === 1 || date.getDate() === 21 || date.getDate() === 31
        ? `${date.getDate()}st`
        : date.getDate() === 2 || date.getDate() === 22
        ? `${date.getDate()}nd`
        : date.getDate() === 3 || date.getDate() === 23
        ? `${date.getDate()}rd`
        : `${date.getDate()}th`;

    // Log both of the dates
    // Friendly format
    Verbose.custom("Printing user-friendly date...");
    console.log(
      `${DAYS[date.getDay()]}, the ${friendlyDate} of ${
        MONTHS[date.getMonth()]
      }, ${date.getFullYear()}`
    );
    // Slash format
    Verbose.custom("Printing slash-format date...");
    console.log(chalk.italic(`(${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()})`));

    // Log a newline
    console.log();
  } catch (err) {
    Verbose.fatalError();
    _fatalError(err);
  }
};

// Export the function
module.exports = date;
