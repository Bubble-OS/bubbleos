const chalk = require("chalk");
const readline = require("readline-sync");

const fs = require("fs");
const path = require("path");

const _errorInterpret = require("../functions/errorInt");
const _convertAbsolute = require("../functions/convAbs");

const mkfile = (fileNameParam) => {
  if (typeof fileNameParam === "undefined") {
    _errorInterpret("0x0020");
    return;
  }

  const fileName = _convertAbsolute(fileNameParam);

  const contents = readline.question(
    `Please enter the file contents (or press 'Enter' to make a blank file): `
  );

  console.log(`\nMaking file: ${chalk.bold.blueBright(fileName)}...`);

  try {
    if (!fs.existsSync(fileName)) {
      fs.writeFileSync(fileName, contents);
      console.log(chalk.green("The operation completed successfully.\n"));
    } else {
      _errorInterpret("0x0021", { variable: fileName });
    }
  } catch (err) {
    if (err.code === "EPERM") {
      _errorInterpret("0x0022", { variable: fileName });
    } else {
      _errorInterpret("0x0023", { variable: fileName, wordCode: err.code });
    }
  }
};

module.exports = mkfile;
