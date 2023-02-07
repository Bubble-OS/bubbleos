const chalk = require("chalk");
const fs = require("fs");

const _replaceSpaces = require("../functions/replaceSpaces");
const _convertSize = require("../functions/convSize");
const _convertAbsolute = require("../functions/convAbs");

const _errorInterpret = require("../functions/errorInt");
const _fatalError = require("../functions/fatalError");

const size = (file, sizesToDisplay) => {
  file = _replaceSpaces(file);

  let sizes = undefined;
  const sizesTrans = {
    b: "Bytes",
    kb: "Kilobytes",
    mb: "Megabytes",
    gb: "Gigabytes",
  };

  if (typeof sizesToDisplay !== "undefined" && !sizesToDisplay.startsWith("--size=")) {
    _errorInterpret(52);
  } else if (typeof sizesToDisplay !== "undefined") {
    sizes = sizesToDisplay.replace("--size=", "").split(",");

    Object.keys(sizesTrans).forEach((value) => {
      if (!sizes.includes(value)) {
        delete sizesTrans[value];
      }
    });
  }

  if (typeof file === "undefined") {
    _errorInterpret(36);
    return;
  }

  const fileName = _convertAbsolute(file);
  if (!fs.existsSync(fileName)) {
    _errorInterpret(37, { variable: fileName });
    return;
  }

  if (fs.lstatSync(fileName).isDirectory()) {
    _errorInterpret(38);
    return;
  }

  try {
    const allSizes = _convertSize(fs.statSync(fileName).size, 4);

    if (typeof sizes !== "undefined") {
      Object.values(sizesTrans).forEach((value) => {
        if (allSizes[value] === 0) {
          console.log(`${value}: ${chalk.bold.red.dim("N/A")}`);
        } else {
          console.log(`${value}: ${chalk.bold.redBright(allSizes[value])}`);
        }
      });
    } else {
      for (let i = 0; i < Object.keys(allSizes).length; i++) {
        if (Object.values(allSizes)[i] === 0) {
          console.log(`${Object.keys(allSizes)[i]}: ${chalk.bold.red.dim("N/A")}`);
        } else {
          console.log(
            `${Object.keys(allSizes)[i]}: ${chalk.bold.redBright(Object.values(allSizes)[i])}`
          );
        }
      }
    }

    console.log();
  } catch (err) {
    _fatalError(err);
  }
};

module.exports = size;
