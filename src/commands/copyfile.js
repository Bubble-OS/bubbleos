const chalk = require("chalk");
const readline = require("readline-sync");

const { copyFileSync } = require("fs");

const _errorInterpret = require("../functions/errorInt");
const _convertAbsolute = require("../functions/convAbs");

const copyfile = (src, dest) => {
  if (!src || !dest) {
    _errorInterpret("0x0006");
    return;
  }

  const srcPath = _convertAbsolute(src.trim());
  const destPath = _convertAbsolute(dest.trim());

  const confirmText = readline
    .question(
      `${chalk.bold.red("WARNING!")} If ${chalk.bold(
        destPath
      )} exists in the destination, it will be overwriten. Continue? [${chalk.green(
        "y"
      )}/${chalk.red.bold("N")}] `
    )
    .toLowerCase();
  if (confirmText.includes("n") || !confirmText.includes("y")) {
    _errorInterpret("0x0007");
    return;
  }

  try {
    console.log(chalk.italic.blueBright("Please wait...\n"));
    copyFileSync(srcPath, destPath);
  } catch (err) {
    if (err.code === "EPERM") {
      _errorInterpret("0x0008", {
        variable: dest,
      });
    } else if (err.code === "ENOENT") {
      _errorInterpret("0x0009", {
        variable: `${src} and/or ${dest}`,
      });
    } else {
      _errorInterpret("0x0010", {
        variable: dest,
        wordCode: err.code,
      });
    }
  }

  console.log(chalk.green("The operation completed successfully.\n"));
};

module.exports = copyfile;
