const chalk = require("chalk");
const { question } = require("readline-sync");

const { existsSync, writeFileSync } = require("fs");

const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");

const _errorInterpret = require("../functions/errorInt");
const _fatalError = require("../functions/fatalError");

const mkfile = (file) => {
  file = _replaceSpaces(file);

  if (!file) {
    _errorInterpret(2, { type: "a file", example: "mkfile test.txt" });
    return;
  }

  const fileName = _convertAbsolute(file);

  const contents = question(`Please enter the file contents (leave blank for an empty file): `);

  try {
    if (!existsSync(fileName)) {
      console.log(`\nMaking file: ${chalk.bold.blueBright(fileName)}...`);
      writeFileSync(fileName, contents);
      console.log(chalk.green("The operation completed successfully.\n"));
    } else {
      _errorInterpret(6, { type: "file", variable: fileName });
    }
  } catch (err) {
    if (err.code === "EPERM") {
      _errorInterpret(4, { todo: "make the file", variable: fileName });
    } else {
      _fatalError(err);
    }
  }
};

module.exports = mkfile;
