const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

const _errorInterpret = require("../functions/errorInt");
const _convertSize = require("../functions/convSize");
const _convertAbsolute = require("../functions/convAbs");

const size = (file) => {
  if (typeof file === "undefined") {
    _errorInterpret("0x0047");
    return;
  }

  const fileName = _convertAbsolute(file);

  if (!fs.existsSync(fileName)) {
    _errorInterpret("0x0048", { variable: fileName });
    return;
  }

  if (fs.lstatSync(fileName).isDirectory()) {
    _errorInterpret("0x0049");
    return;
  }

  try {
    const allSizes = _convertSize(fs.statSync(fileName).size, 2);
    for (let i = 0; i < Object.keys(allSizes).length; i++) {
      if (Object.values(allSizes)[i] === 0) {
        console.log(`${Object.keys(allSizes)[i]}: ${chalk.bold.red.dim("N/A")}`);
      } else {
        console.log(
          `${Object.keys(allSizes)[i]}: ${chalk.bold.redBright(Object.values(allSizes)[i])}`
        );
      }
    }
    console.log();
  } catch (err) {
    _errorInterpret("0x0050", { variable: fileName, wordCode: err.code });
  }
};

module.exports = size;
