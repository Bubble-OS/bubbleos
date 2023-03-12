const chalk = require("chalk");
const psList = require("ps-list");
const sortKeys = require("sort-keys");

const _replaceSpaces = require("../functions/replaceSpaces");
const _fatalError = require("../functions/fatalError");

const tasklist = async (filter, ...args) => {
  try {
    filter = _replaceSpaces(filter);

    const processes = await psList();

    processes.sort((a, b) => a.name.localeCompare(b.name));

    let maxLength = 0;
    for (let i = 0; i < processes.length; i++) {
      let len = processes[i].name.length;
      if (len > maxLength) {
        maxLength = len;
      }
    }

    console.log(
      `${chalk.bold.underline("Name".padEnd(maxLength))}   ${chalk.bold.underline("PID")}`
    );

    processes.forEach((process) => {
      if (typeof filter !== "undefined" && filter === process.name) {
        console.log(`${chalk.bold(process.name.padEnd(maxLength))}   ${process.pid}`);
      } else if (typeof filter === "undefined") {
        console.log(`${chalk.bold(process.name.padEnd(maxLength))}   ${process.pid}`);
      }
    });

    console.log();
  } catch (err) {
    _fatalError(err);
  }
};

module.exports = tasklist;
