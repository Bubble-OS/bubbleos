const fs = require("fs");

const chalk = require("chalk");

const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");
const _fatalError = require("../functions/fatalError");

const Verbose = require("../classes/Verbose");
const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");

const cd = (dir, ...params) => {
  let dirChk = new Checks(dir);

  const verbose = new Verbose(
    params?.includes("--verbose") ||
      params?.includes("/verbose") ||
      dir?.includes("--verbose") ||
      dir?.includes("/verbose")
  );
  verbose.startCmd("cd");

  verbose.intParams();
  const silent = params?.includes("-s") || params?.includes("/s");

  verbose.chkUndefined(dir);
  if (dirChk.paramUndefined()) {
    verbose.enterParam();
    Errors.enterParameter("a directory", "cd test");
    verbose.wasError("cd");
    return;
  }
  verbose.chkComplete();

  verbose.replaceSpacesAndConvAbs(dir);
  dir = _replaceSpaces(dir);

  verbose.chkExistant(dir);
  if (dirChk.doesExist()) {
    verbose.nonExistant(dir);
    Errors.doesNotExist("directory", dir);
    verbose.wasError("cd");
    return;
  }
  verbose.chkComplete();

  try {
    verbose.attemptTo("change into the directory", dir);
    process.chdir(dir);

    if (!silent) console.log(`Changed directory to ${chalk.green(process.cwd())}.\n`);
    verbose.operationSuccess("cd");
  } catch (err) {
    if (err.code === "EPERM") {
      verbose.permsErr(dir);
      Errors.noPermissions("change into", dir);
    } else {
      _fatalError(err);
    }

    verbose.wasError("cd");
    return;
  }
};

module.exports = cd;
