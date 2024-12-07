// Get variables
const {
  GLOBAL_NAME,
  IN_BETA,
  TIMEBOMB_ACTIVATED,
  EXPIRY_DATE,
} = require("../../variables/constants");

// Get functions
const _startupError = require("./startupError");
const _fatalError = require("../fatalError");

const _timebomb = () => {
  try {
    // Only if BubbleOS is in beta and the timebomb is activated will BubbleOS check the date
    if (IN_BETA && TIMEBOMB_ACTIVATED) {
      // Get the current date
      const currentDate = new Date();

      // If the expiry date is past the current date, throw an error
      if (EXPIRY_DATE.getTime() < currentDate.getTime())
        _startupError(
          `This beta build of ${GLOBAL_NAME} has expired. Please upgrade to a newer version of ${GLOBAL_NAME}.`,
          true,
          `${GLOBAL_NAME} was forcefully crashed due to the timebomb expiring.`
        );
    }
  } catch (err) {
    _fatalError(err);
  }
};

// Export the function
module.exports = _timebomb;
