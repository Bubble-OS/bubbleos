const chalk = require("chalk");
const readline = require("readline-sync");

const fs = require("fs");

const _convertAbsolute = require("../functions/convAbs");

const _errorInterpret = require("../functions/errorInt");
const _fatalError = require("../functions/fatalError");

const mkfile = (file) => {
  if (!file) {
    _errorInterpret(15);
    return;
  }

  const fileName = _convertAbsolute(file);

  const contents = readline.question(
    `Please enter the file contents (or press 'Enter' to make a blank file): `
  );

  try {
    if (!fs.existsSync(fileName)) {
      console.log(`\nMaking file: ${chalk.bold.blueBright(fileName)}...`);
      fs.writeFileSync(fileName, contents);
      console.log(chalk.green("The operation completed successfully.\n"));
    } else {
      _errorInterpret(16, { variable: fileName });
    }
  } catch (err) {
    if (err.code === "EPERM") {
      _errorInterpret(17, { variable: fileName });
    } else {
      _fatalError(err);
    }
  }
};

module.exports = mkfile;
