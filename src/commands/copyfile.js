const chalk = require("chalk");
const readline = require("readline-sync");

const { copyFileSync } = require("fs");
const path = require("path");

const _errorInterpret = require("../functions/errorInt");

const copyfile = (src, dest) => {
  if (!src || !dest) {
    _errorInterpret("0x0002", { type: "the files", example: "copyfile test.txt D:\\test.txt" });
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
    console.log(chalk.yellow(`Operation cancelled.`));
    return;
  }

  try {
    copyFileSync(srcPath, destPath);

    console.log(chalk.italic.blueBright("Please wait...\n"));
    console.log(chalk.green("The operation completed successfully.\n"));
  } catch (err) {
    if (err.code === "EPERM") {
      _errorInterpret("0x0004", {
        variable: dest,
        type: "copy to the directory",
        wordCode: err.code,
      });
    } else if (err.code === "ENOENT") {
      console.log(
        chalk.red(
          `The source or destination folder (or file, source) is non-existant. Please confirm that they exist.\n`
        )
      );

      _errorInterpret("0x0003", {
        variable: `${src} and/or ${dest}`,
        type: "directories",
        wordCode: err.code,
      });
    } else {
      _errorInterpret("0x0005", {
        variable: `to ${dest}`,
        type: "copying",
        wordCode: err.code,
      });
    }
  }
};

module.exports = copyfile;
