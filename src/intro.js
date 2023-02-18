const chalk = require("chalk");

const { question } = require("readline-sync");

const {
  GLOBAL_NAME,
  AUTHOR,
  VERSION,
  BUILD,
  IN_BETA,
  TIMEBOMB_ACTIVATED,
  EXPIRY_DATE,
  TIMEBOMB_COUNT,
} = require("./variables/aboutConsts");

if (IN_BETA && TIMEBOMB_ACTIVATED) {
  const currentDate = new Date();

  if (EXPIRY_DATE.getTime() < currentDate.getTime()) {
    console.log(
      chalk.red(
        "This beta build of BubbleOS has expired. Please upgrade to a new version of BubbleOS."
      )
    );
    question(chalk.red("Press any key to continue . . ."));

    console.log();
    process.exit(1);
  }
}

console.log(`${chalk.bold(`${GLOBAL_NAME}, v${VERSION} (build ${BUILD})`)}`);
console.log(`Made by ${AUTHOR}!\n`);

if (IN_BETA) {
  if (TIMEBOMB_ACTIVATED) {
    console.log(
      chalk.dim(
        `${chalk.bold(
          "WARNING!"
        )} This beta software has a timebomb of +${TIMEBOMB_COUNT} days (since compile date).\nIt will expire on ${EXPIRY_DATE.getDate()}/${
          EXPIRY_DATE.getMonth() + 1
        }/${EXPIRY_DATE.getFullYear()}.\n`
      )
    );
  } else {
    console.log(
      chalk.dim(
        `${chalk.bold(
          "WARNING!"
        )} This software is in beta and subject to changes.\nThis software is extremely unstable and should not be used for day-to-day use.\n`
      )
    );
  }
}

console.log(`For help on some available commands, type ${chalk.italic("help")}.`);
console.log(`For more information about a command, type ${chalk.italic("help <command>")}.\n`);

console.log(`To exit the ${GLOBAL_NAME} shell, type ${chalk.italic("exit")}.\n`);
