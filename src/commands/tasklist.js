const chalk = require("chalk");
const psList = require("ps-list");

const _replaceSpaces = require("../functions/replaceSpaces");
const _fatalError = require("../functions/fatalError");

const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");

const tasklist = async (filter, ...args) => {
  try {
    filter = _replaceSpaces(filter);

    const filterUndefined = new Checks(filter).paramUndefined();

    const processes = await psList();

    processes.sort((a, b) => a.name.localeCompare(b.name));

    let maxLength = 0;
    if (filterUndefined) {
      for (let i = 0; i < processes.length; i++) {
        let len = processes[i].name.length;
        if (len > maxLength) {
          maxLength = len;
        }
      }
    }

    if (filterUndefined)
      console.log(
        `${chalk.bold.underline("Name") + "".padEnd(maxLength - 1)}${chalk.bold.underline("PID")}`
      );

    let foundFilter = false;
    processes.forEach((process) => {
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
      console.log(
        chalk.yellow(`No processes found for the name '${chalk.italic.bold(filter)}'.\n`)
      );
      return;
    }

    console.log();
  } catch (err) {
    _fatalError(err);
  }
};

module.exports = tasklist;
