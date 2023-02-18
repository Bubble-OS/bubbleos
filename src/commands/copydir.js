const chalk = require("chalk");

const fs = require("fs");

const _convertAbsolute = require("../functions/convAbs");
const _replaceSpaces = require("../functions/replaceSpaces");

const Errors = require("../classes/Errors");
const _fatalError = require("../functions/fatalError");

const copydir = (src, dest, ...params) => {
  if (typeof src === "undefined" || typeof dest === "undefined") {
    Errors.enterParameter("the source/destination", "copydir srcDir destDir");
    return;
  }

  let rmSymlinkReference = false;
  let keepTimes = false;
  if (params.includes("--rm-symlink") || params.includes("/rm-symlink")) rmSymlinkReference = true;
  if (params.includes("-t") || params.includes("/t")) keepTimes = true;

  src = _replaceSpaces(src);
  src = _convertAbsolute(src);
  dest = _replaceSpaces(dest);
  dest = _convertAbsolute(dest);

  if (!fs.existsSync(src)) {
    Errors.doesNotExist("source", src);
    return;
  }

  try {
    console.log(chalk.italic.blueBright("Please wait..."));
    fs.cpSync(src, dest, {
      recursive: true,
      dereference: rmSymlinkReference,
      preserveTimestamps: keepTimes,
    });
    console.log(chalk.green("The operation completed successfully.\n"));
  } catch (err) {
    if (err.code === "EPERM") {
      console.log(
        chalk.yellow(
          "Note: If the directory contains a symbolic link, either run this command as an administrator, or add '--rm-symlink' at the end of this command."
        )
      );
      Errors.noPermissions("copy parts of", src);
      return;
    } else {
      _fatalError(err);
    }
  }
};

module.exports = copydir;
