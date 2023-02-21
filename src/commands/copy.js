const chalk = require("chalk");

const fs = require("fs");

const _convertAbsolute = require("../functions/convAbs");
const _replaceSpaces = require("../functions/replaceSpaces");
const _fatalError = require("../functions/fatalError");

const Errors = require("../classes/Errors");

const copy = (src, dest, ...params) => {
  if (typeof src === "undefined" || typeof dest === "undefined") {
    Errors.enterParameter("the source/destination", "copy src dest");
    return;
  }

  const isDir = fs.lstatSync(src).isDirectory();

  const rmSymlinkReference = params.includes("--rm-symlink") || params.includes("/rm-symlink");
  const keepTimes = params.includes("-t") || params.includes("/t");

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

    if (isDir) {
      fs.cpSync(src, dest, {
        recursive: true,
        dereference: rmSymlinkReference,
        preserveTimestamps: keepTimes,
      });
    } else {
      fs.copyFileSync(src, dest);
    }

    console.log(chalk.green("The operation completed successfully.\n"));
  } catch (err) {
    if (err.code === "EPERM") {
      if (isDir)
        console.log(
          chalk.yellow(
            "Note: If the directory contains a symbolic link, either run this command as an administrator, or add '--rm-symlink' at the end of this command."
          )
        );
      Errors.noPermissions("copy", src);
      return;
    } else {
      _fatalError(err);
    }
  }
};

module.exports = copy;
