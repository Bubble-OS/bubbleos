const chalk = require("chalk");
const readline = require("readline-sync");

const { copyFileSync } = require("fs");
const path = require("path");

const _errorInterpret = require("../functions/errorInt");

const copyfile = (src, dest) => {
  if (!src || !dest) {
    _errorInterpret("0x0006");
    return;
  }

  const convertToAbsolute = (param) => {
    const isAbsolutePath = path.isAbsolute(param);
    let pathName = "";

    if (!isAbsolutePath) {
      pathName = process.cwd() + "\\" + param;
    } else {
      pathName = param;
    }

    return pathName;
  };

  const srcPath = convertToAbsolute(src.trim());
  const destPath = convertToAbsolute(dest.trim());

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
    copyFileSync(srcPath, destPath);

    console.log(chalk.italic.blueBright("Please wait...\n"));
    console.log(chalk.green("The operation completed successfully.\n"));
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
        variable: `${dest}`,
        wordCode: err.code,
      });
    }
  }
};

module.exports = copyfile;
