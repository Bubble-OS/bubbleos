const chalk = require("chalk");

const _replaceSpaces = require("../functions/replaceSpaces");

const _fatalError = require("../functions/fatalError");
const _verbInt = require("../functions/verboseInt");

const Verbose = require("../classes/Verbose");
const Errors = require("../classes/Errors");

const cd = (dir, ...params) => {
  const verb = new Verbose(
    params.includes("--verbose") ||
      params.includes("/verbose") ||
      dir.includes("--verbose") ||
      dir.includes("/verbose")
  );
  verb.startCmd("cd");

  dir = _replaceSpaces(dir);

  verb.chkUndefined("dir");
  if (typeof dir === "undefined" || dir === "--verbose" || dir === "/verbose") {
    Errors.enterParameter("a directory", "cd test");
    return;
  }

  try {
    process.chdir(dir);
  } catch (err) {
    if (err.code === "ENOENT") {
      Errors.doesNotExist("directory", dir);
    } else if (err.code === "EPERM") {
      Errors.noPermissions("change into the directory", dir);
    } else {
      _fatalError(err);
    }

    return;
  }

  console.log(`Changed directory to ${chalk.green(process.cwd())}.\n`);
};

module.exports = cd;
