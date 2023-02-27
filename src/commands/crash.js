const chalk = require("chalk");
const { keyInSelect } = require("readline-sync");
const _fatalError = require("../functions/fatalError");

const _promptForYN = require("../functions/promptForYN");
const { GLOBAL_NAME } = require("../variables/aboutConsts");

const crash = (...args) => {
  const AVAILABLE_CRASHES = [`Fatal Error (${GLOBAL_NAME})`, "Hang", "Memory Leak"];

  console.log(
    chalk.red.bold(
      `${chalk.bgRed.white(
        " WARNING! "
      )} Using this command can cause issues such as loss of data, high CPU/RAM usage, and more. Save all data before continuing.`
    )
  );

  const index = keyInSelect(AVAILABLE_CRASHES, "Please select your crashing method");
  if (index === -1) {
    console.log(chalk.yellow("Operation cancelled.\n"));
    return;
  }

  if (
    !_promptForYN(
      `You have chosen ${chalk.italic(
        `'${AVAILABLE_CRASHES[index]}'`
      )}. Are you sure you want to do this?`
    )
  ) {
    console.log(chalk.yellow("Operation cancelled.\n"));
    return;
  }

  console.log();

  if (index === 0) {
    try {
      throw new Error("BubbleOS was purposefully crashed with the 'crash' command.");
    } catch (err) {
      _fatalError(err);
    }
  } else if (index === 1) {
    while (true) {
      process.stdout.write("\033c");
    }
  } else if (index === 2) {
    console.log(
      chalk.yellow(
        `${chalk.bold(
          "NOTE:"
        )} BubbleOS will crash once memory usage has hit its maximum allocated memory space.\n`
      )
    );

    const crashArr = [];
    let i = 0;
    while (true) {
      crashArr.push(i);
      i++;
    }
  }
};

module.exports = crash;
