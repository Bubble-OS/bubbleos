const chalk = require("chalk");
const sortKeys = require("sort-keys");

const HELP_MESSAGES = require("../variables/helpMessages");

const _fatalError = require("../functions/fatalError");

const Errors = require("../classes/Errors");

const help = (command) => {
  try {
    const sorted = sortKeys(HELP_MESSAGES);

    const printHelp = (specific, cmd) => {
      cmd = cmd.toLowerCase();

      if (specific) {
        console.log(`${chalk.bold(cmd)}: ${chalk.italic(sorted[cmd].usage)}`);

        console.log(`\n  ${sorted[cmd].desc}\n`);

        if (typeof sorted[cmd].args !== "undefined") {
          if (Object.keys(sorted[cmd].args).length !== 0) {
            console.log("  " + chalk.underline("Arguments:"));
            for (const arg in sorted[cmd].args) {
              console.log(`    ${arg.padEnd(15)} ${sorted[cmd].args[arg]}`);
            }
            console.log();
          }
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
      printHelp(false);

      console.log(
        chalk.yellow.italic(
          `\nTip: To get information about a specific command, run ${chalk.italic(
            "'help <command>'"
          )}.\n`
        )
      );
    } else {
      for (const commandName in sorted) {
        if (commandName.toLowerCase() === command.toLowerCase()) {
          printHelp(true, commandName);
          return;
        }
      }

      Errors.unrecognizedCommand(command);
    }
  } catch (err) {
    _fatalError(err);
  }
};

module.exports = help;
