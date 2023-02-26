const chalk = require("chalk");
const sortKeys = require("sort-keys");
const HELP_MESSAGES = require("../variables/helpMessages");

const Errors = require("../classes/Errors");

const help = (command) => {
  const sorted = sortKeys(HELP_MESSAGES);

  const printHelp = (commandChosen, all) => {
    if (all) {
      console.log(`${chalk.bold(commandChosen)}: ${chalk.italic(sorted[commandChosen].usage)}`);

      console.log(`\n  ${sorted[commandChosen].desc}\n`);

      if (typeof sorted[commandChosen].args !== "undefined") {
        console.log("  " + chalk.underline("Arguments:"));
        for (const arg in sorted[commandChosen].args) {
          console.log(`    ${arg.padEnd(15)} ${sorted[commandChosen].args[arg]}`);
        }
        console.log();
      }

      return;
    } else {
      let finalStr = "";

      for (let i = 1; i < Object.keys(sorted).length + 1; i++) {
        finalStr += Object.keys(sorted)[i - 1].padEnd(15);
        if (i % 3 === 0) {
          finalStr += "\n";
        }
      }

      console.log(finalStr);
      return;
    }
  };

  if (typeof command === "undefined") {
    printHelp(HELP_DEFINITIONS, false);

    console.log(
      chalk.yellow.italic(
        `Tip: To get information about a specific command, run ${chalk.italic(
          "'help <command>'"
        )}.\n`
      )
    );
  } else {
    for (const commandName in sorted) {
      if (commandName === command) {
        printHelp(commandName, true);
        return;
      }
    }

    Errors.unrecognizedCommand(command);
  }
};

module.exports = help;
