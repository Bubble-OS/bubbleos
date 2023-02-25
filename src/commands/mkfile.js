const fs = require("fs");

const chalk = require("chalk");
const { question } = require("readline-sync");

const Errors = require("../classes/Errors");

const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");
const _fatalError = require("../functions/fatalError");

const mkfile = (file) => {
  file = _replaceSpaces(file);

  if (typeof file === "undefined") {
    Errors.enterParameter("a file", "mkfile test.txt");
    return;
  }

  file = _replaceSpaces(file);
  file = _convertAbsolute(file);

  if (fs.existsSync(file)) {
    Errors.alreadyExists("file", file);
    return;
  }

  const contents = _replaceSpaces(
    question(
      `Please enter the file contents (${chalk.italic("'Enter'")} to accept; ${chalk.italic(
        "'/n'"
      )} for a newline; leave blank to make an empty file): `
    ),
    "/n",
    "\n"
  );

  try {
    console.log(`\nMaking file: ${chalk.bold.blueBright(file)}...`);
    fs.writeFileSync(file, contents);

    console.log(chalk.green("The operation completed successfully.\n"));
  } catch (err) {
    if (err.code === "EPERM") {
      Errors.noPermissions("make the file", file);
    } else if (err.code === "ENAMETOOLONG") {
      Errors.pathTooLong(file);
    } else if (err.code === "EINVAL") {
      Errors.invalidCharacters(
        "directory name",
        "valid path characters",
        "characters such as '?' or ':' (Windows only)",
        dir
      );
    } else {
      _fatalError(err);
    }
  }
};

module.exports = mkfile;
