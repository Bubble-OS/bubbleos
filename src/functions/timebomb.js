const chalk = require("chalk");
const { keyInPause } = require("readline-sync");

const {
  GLOBAL_NAME,
  IN_BETA,
  TIMEBOMB_ACTIVATED,
  EXPIRY_DATE,
} = require("../variables/aboutConsts");
const _fatalError = require("./fatalError");

const _timebomb = () => {
  if (IN_BETA && TIMEBOMB_ACTIVATED) {
    const currentDate = new Date();

    if (EXPIRY_DATE.getTime() < currentDate.getTime()) {
      console.log(
        chalk.red(
          `This beta build of ${GLOBAL_NAME} has expired. Please upgrade to a newer version of ${GLOBAL_NAME}.\n${GLOBAL_NAME} will now crash.\n`
        )
      );
      keyInPause(chalk.red("Press any key to continue . . . "), { guide: false });

      console.log();

      try {
        throw new Error("BubbleOS was forcefully crashed due to the timebomb expiring.");
      } catch (err) {
        _fatalError(err, false);
      }
    }
  }
};

module.exports = _timebomb;
