const chalk = require("chalk");
const fs = require("fs");

const _errorInterpret = require("../functions/errorInt");
const _verboseInterpret = require("../functions/verboseInt");

const ls = (directory, verbose = false) => {
  _verboseInterpret(
    `In ${chalk.italic("'ls'")} function; beginning ${chalk.italic("'ls'")} function...`,
    verbose
  );
  _verboseInterpret(`Checking if directory passed exists...`, verbose);

  if (!fs.existsSync(directory)) {
    _verboseInterpret(
      `Directory does not exist (function ${chalk.italic("!fs.existsSync")} returned ${chalk.italic(
        "true"
      )}); error code of ${chalk.bold("0x0015")} was received (error message ENOENT); exiting...`,
      verbose
    );
    _errorInterpret("0x0015", { variable: directory });
    return;
  }

  _verboseInterpret(`Check passed successfully; continuing...`, verbose);

  _verboseInterpret(
    `Reading directory for files, filtering out directories, and sorting...`,
    verbose
  );
  const files = fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((item) => !item.isDirectory())
    .map((item) => {
      return { name: item.name, type: "file" };
    })
    .sort();

  _verboseInterpret(`Reading directory for folders, filtering out files, and sorting...`, verbose);
  const folders = fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => {
      return { name: item.name, type: "folder" };
    })
    .sort();

  _verboseInterpret(`Adding files and folders to one 'array'...`, verbose);
  const all = [...folders, ...files];

  _verboseInterpret(`Preparing loop...`, verbose);
  all.forEach((item, idx) => {
    _verboseInterpret(`Loop #${idx + 1}`, verbose);

    if (item.type === "file") {
      _verboseInterpret(`Item is a file, printing to stdout...`, verbose);
      console.log(chalk.green(item.name));
    } else if (
      item.type === "folder" &&
      (item.name.startsWith(".") || item.name.startsWith("_") || item.name.startsWith("$"))
    ) {
      _verboseInterpret(
        `Item is a folder beginning with '.', '_', or '$', printing to stdout...`,
        verbose
      );
      console.log(chalk.bold.grey(item.name));
    } else {
      _verboseInterpret(`Item is a folder, printing to stdout...`, verbose);
      console.log(chalk.bold.blue(item.name));
    }
  });

  _verboseInterpret(`Completed loop`, verbose);
  verbose
    ? _verboseInterpret(
        `Completed ${chalk.italic("'ls'")} function successfully, exiting...\n`,
        verbose
      )
    : console.log();
};

module.exports = ls;
