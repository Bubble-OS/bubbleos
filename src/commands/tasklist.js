const chalk = require("chalk");
const psList = require("ps-list");

const _fatalError = require("../functions/fatalError");
const _parseDoubleQuotes = require("../functions/parseQuotes");

const Checks = require("../classes/Checks");
const Verbose = require("../classes/Verbose");

/**
 * Shows all the processes running on the system, or
 * a specific process. Useful for finding PIDs to kill
 * using `taskkill`.
 *
 * @param {string} filter The filter for what process(es) to show.
 * @param {...string} args Arguments to modify the behavior of `tasklist`.
 */
const tasklist = async (filter, ...args) => {
  try {
    Verbose.parseQuotes();
    filter = _parseDoubleQuotes([filter, ...args])[0];

    Verbose.initChecker();
    const filterUndefined = new Checks(filter).paramUndefined();

    Verbose.custom("Getting list of processes...");
    const processes = await psList();

    Verbose.custom("Sorting processes by name...");
    processes.sort((a, b) => a.name.localeCompare(b.name));

    let maxLength = 0;
    Verbose.custom("Finding the longest process name...");
    if (filterUndefined) {
      for (let i = 0; i < processes.length; i++) {
        let len = processes[i].name.length;
        if (len > maxLength) {
          maxLength = len;
        }
      }
    }

    // Print the processes
    if (filterUndefined)
      console.log(
        `${chalk.bold.underline("Name") + "".padEnd(maxLength - 1)}${chalk.bold.underline("PID")}`
      );

    let foundFilter = false;
    processes.forEach((process) => {
      Verbose.custom("Checking if the process name matches the filter...");
      if (!filterUndefined && filter === process.name) {
        if (!foundFilter)
          console.log(
            `${chalk.bold.underline("Name") + "".padEnd(filter.length)} ${chalk.bold.underline(
              "PID"
            )}`
          );
        foundFilter = true;
        console.log(`${chalk.bold(process.name.padEnd(maxLength))}     ${process.pid}`);
      } else if (filterUndefined) {
        console.log(`${chalk.bold(process.name.padEnd(maxLength))}   ${process.pid}`);
      }
    });

    if (!foundFilter && !filterUndefined) {
      Verbose.custom("No processes found for the filter.");
      console.log(
        chalk.yellow(`No processes found for the name '${chalk.italic.bold(filter)}'.\n`)
      );
      return;
    }

    console.log();
  } catch (err) {
    Verbose.fatalError();
    _fatalError(err);
  }
};

module.exports = tasklist;
