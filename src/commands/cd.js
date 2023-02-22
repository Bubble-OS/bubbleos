const fs = require("fs");

const chalk = require("chalk");

const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");
const _fatalError = require("../functions/fatalError");

const Verbose = require("../classes/Verbose");
const Errors = require("../classes/Errors");

const cd = (dir, ...params) => {
  const verb = new Verbose(
    params?.includes("--verbose") ||
      params?.includes("/verbose") ||
      dir?.includes("--verbose") ||
      dir?.includes("/verbose")
  );
  verb.startCmd("cd");

  verb.chkUndefined(dir);
  if (typeof dir === "undefined" || dir === "--verbose" || dir === "/verbose") {
    verb.enterParam();
    Errors.enterParameter("a directory", "cd test");
    verb.wasError("cd");
    return;
  }
  verb.chkComplete();

  verb.replaceSpacesAndConvAbs(dir);
  dir = _replaceSpaces(dir);

  verb.chkExistant(dir);
  if (!fs.existsSync(dir)) {
    verb.nonExistant(dir);
    Errors.doesNotExist("directory", dir);
    verb.wasError("cd");
    return;
  }
  verb.chkComplete();

  try {
    verb.attemptTo("change into the directory", dir);
    process.chdir(dir);
    console.log(`Changed directory to ${chalk.green(process.cwd())}.\n`);
    verb.operationSuccess("cd");
  } catch (err) {
    if (err.code === "EPERM") {
      verb.permsErr(dir);
      Errors.noPermissions("change into", dir);
    } else {
      _fatalError(err);
    }

    verb.wasError("cd");
    return;
  }
};

module.exports = cd;
