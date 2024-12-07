// Get modules
const chalk = require("chalk");

const _manageConfig = require("./functions/manageConfig");

// Get variables
const {
  GLOBAL_NAME,
  AUTHOR,
  VERSION,
  BUILD,
  IN_BETA,
  TIMEBOMB_ACTIVATED,
  EXPIRY_DATE,
} = require("./variables/constants");

const Verbose = require("./classes/Verbose");

if (typeof _manageConfig("get").parsed === "undefined") {
  console.log(
    chalk.red(
      `${chalk.white.bgRed(
        " ERROR: "
      )} Error when reading the configuration file. Resetting file...\n`
    )
  );

  _manageConfig("delete");
  _manageConfig("create");
}

// Show the name of the OS, the version, and the author
console.log(`${chalk.bold(`${GLOBAL_NAME}, v${VERSION} (build ${BUILD})`)}`);

if (!_manageConfig("get").parsed.firstIntro) {
  console.log(`Made by ${AUTHOR}!`);
}

console.log();

Verbose.custom("Checking if BubbleOS is in beta...");
// If BubbleOS is in beta...
if (IN_BETA) {
  // ...and the timebomb is activated...
  Verbose.custom("Checking if the timebomb is activated...");
  if (TIMEBOMB_ACTIVATED) {
    // Show a timebomb warning message
    Verbose.custom("Timebomb is activated and is in beta, show relevant message...");
    console.log(
      chalk.dim(
        `${chalk.bold(
          "WARNING!"
        )} This beta software has a timebomb of +90 days (since compile date).\nIt will expire on ${
          EXPIRY_DATE.getMonth() + 1
        }/${EXPIRY_DATE.getDate()}/${EXPIRY_DATE.getFullYear()}.\n`
      )
    );
  } else {
    // ...else
    // Show a beta warning message
    Verbose.custom("Timebomb is not activated but software is in beta, show relevant message...");
    console.log(
      chalk.dim(
        `${chalk.bold(
          "WARNING!"
        )} This software is in beta and subject to changes.\nThis software is extremely unstable and should not be used for day-to-day use.\n`
      )
    );
  }
}

// Show information about commands
if (!_manageConfig("get").parsed.firstIntro) {
  console.log(`For a list on some available commands, type ${chalk.italic("'help'")}.`);
  console.log(`For more information about a command, type ${chalk.italic("'help <command>'")}.\n`);

  console.log(`To exit the ${GLOBAL_NAME} shell, type ${chalk.italic("'exit'")}.\n`);
}

_manageConfig("add", { firstIntro: true });
