const chalk = require("chalk");
const { isText } = require("istextorbinary");

const fs = require("fs");

const _errorInterpret = require("../functions/errorInt");
const _convertAbsolute = require("../functions/convAbs");

const fif = (file, toFind) => {
  if (typeof file === "undefined" || typeof toFind === "undefined") {
    _errorInterpret("0x0060");
    return;
  }

  const fileName = _convertAbsolute(file);

  if (!fs.existsSync(fileName)) {
    _errorInterpret("0x0061", { variable: fileName });
    return;
  }

  try {
    if (!isText(fileName, fs.readFileSync(fileName, { flag: "r" }))) {
      _errorInterpret("0x0062");
      return;
    }

    console.log(
      `Number of occurances: ${chalk.bold.green(str.match(new RegExp(toFind, "ig") || [])).length}`
    );

    console.log(chalk.dim("_".repeat(process.stdout.columns)));

    const contents = fs.readFileSync(fileName, { encoding: "utf-8", flag: "r" });
    contents.replaceAll(toFind, chalk.bgYellow(toFind));
  } catch (err) {
    // TODO Fix error codes; add help documentation
    if (err.code === "EISDIR") {
      _errorInterpret("0x0027", { variable: fileName });
    } else {
      _errorInterpret("0x0028", { variable: fileName, wordCode: err.code });
    }
  }
};

module.exports = fif;
