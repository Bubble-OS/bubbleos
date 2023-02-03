const chalk = require("chalk");
const { isText } = require("istextorbinary");

const fs = require("fs");

const _convertAbsolute = require("../functions/convAbs");

const _errorInterpret = require("../functions/errorInt");
const _fatalError = require("../functions/fatalError");

const wcount = (file) => {
  if (!file) {
    _errorInterpret(31);
    return;
  }

  const fileName = _convertAbsolute(file);

  if (!fs.existsSync(fileName)) {
    _errorInterpret(32, { variable: fileName });
    return;
  }

  try {
    if (!isText(fileName, fs.readFileSync(fileName, { flag: "r" }))) {
      _errorInterpret(33);
      return;
    }

    console.log(chalk.italic.blueBright("Please wait..."));

    const fileContents = fs.readFileSync(fileName, { encoding: "utf-8", flag: "r" });
    console.log(`Characters (including whitespace): ${chalk.bold(fileContents.length)}`);
    console.log(`Words: ${chalk.bold(fileContents.split(" ").length)}\n`);
  } catch (err) {
    if (err.code === "EISDIR") {
      _errorInterpret(34, { variable: fileName });
    } else {
      _fatalError(err);
    }
  }
};

module.exports = wcount;
