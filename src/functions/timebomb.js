const chalk = require("chalk");
const { question } = require("readline-sync");

const {
  GLOBAL_NAME,
  IN_BETA,
  TIMEBOMB_ACTIVATED,
  EXPIRY_DATE,
} = require("../variables/aboutConsts");

const _timebomb = () => {
  if (IN_BETA && TIMEBOMB_ACTIVATED) {
    const currentDate = new Date();

    if (EXPIRY_DATE.getTime() < currentDate.getTime()) {
      console.log(
        chalk.red(
          `This beta build of ${GLOBAL_NAME} has expired. Please upgrade to a new version of ${GLOBAL_NAME}.`
        )
      );
      question(chalk.red("Press any key to continue . . . "));

      console.log();
      process.exit(1);
    }
  }
};

module.exports = _timebomb;
