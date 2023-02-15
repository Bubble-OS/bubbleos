const chalk = require("chalk");
const { existsSync, lstatSync, statSync } = require("fs");

const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");

const Errors = require("../classes/Errors");
const _fatalError = require("../functions/fatalError");

const _convertSize = (bytes, decimals = 3) => {
  const kilobytes = parseFloat((bytes / 1000).toFixed(decimals));
  const megabytes = parseFloat((kilobytes / 1000).toFixed(decimals));
  const gigabytes = parseFloat((megabytes / 1000).toFixed(decimals));

  return {
    Bytes: bytes,
    Kilobytes: kilobytes,
    Megabytes: megabytes,
    Gigabytes: gigabytes,
  };
};

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
    console.log("This check will be removed (ACTUAL ERR MSG: 'sizes' must start with '--size=')\n");
    return;
  } else if (typeof sizesToDisplay !== "undefined") {
    sizes = sizesToDisplay.replace("--size=", "").split(",");

    Object.keys(sizesTrans).forEach((value) => {
      if (!sizes.includes(value)) {
        delete sizesTrans[value];
      }
    });
  }

  if (typeof file === "undefined") {
    Errors.enterParameter("a file", "size test.txt");
    return;
  }

  const fileName = _convertAbsolute(file);
  if (!existsSync(fileName)) {
    Errors.doesNotExist("file", fileName);
    return;
  }

  if (lstatSync(fileName).isDirectory()) {
    Errors.expectedFile(fileName);
    return;
  }

  try {
    const allSizes = _convertSize(statSync(fileName).size, 4);

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
