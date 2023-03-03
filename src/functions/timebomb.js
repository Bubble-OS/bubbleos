// Get modules
const chalk = require("chalk");
const { keyInPause } = require("readline-sync");

// Get variables
const { GLOBAL_NAME, IN_BETA, TIMEBOMB_ACTIVATED, EXPIRY_DATE } = require("../variables/constants");

// Get functions
const _fatalError = require("./fatalError");

const _timebomb = () => {
  // Only if BubbleOS is in beta and the timebomb is activated will BubbleOS check the date
  if (IN_BETA && TIMEBOMB_ACTIVATED) {
    // Get the current date
    const currentDate = new Date();

    // If the expiry date is past the current date, throw an error
    if (EXPIRY_DATE.getTime() < currentDate.getTime()) {
      // Show a warning message
      console.log(
        chalk.red(
          `This beta build of ${GLOBAL_NAME} has expired. Please upgrade to a newer version of ${GLOBAL_NAME}.\n${GLOBAL_NAME} will now crash.\n`
        )
      );
      keyInPause(chalk.red("Press any key to continue . . . "), { guide: false });

      // Newline
      console.log();

      // Throw an error
      try {
        throw new Error("BubbleOS was forcefully crashed due to the timebomb expiring.");
      } catch (err) {
        _fatalError(err, false);
      }
    }
  }
};

// Export the function
module.exports = _timebomb;
