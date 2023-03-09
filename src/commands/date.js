// Import modules
const chalk = require("chalk");

// Import functions
const _fatalError = require("../functions/fatalError");

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
    /**
     * All of the days of the week.
     */
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    /**
     * All of the months of the year.
     */
    const months = [
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

    // Make a new date
    const date = new Date();

    /**
     * The friendly date, that will have either a _-st_, _-nd_, _-rd_, or _-th_ suffix.
     */
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
    console.log(
      `${days[date.getDay()]}, the ${friendlyDate} of ${
        months[date.getMonth()]
      }, ${date.getFullYear()}`
    );
    // Slash format
    console.log(chalk.italic(`(${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()})`));

    // Log a newline
    console.log();
  } catch (err) {
    _fatalError(err);
  }
};

// Export the function
module.exports = date;
