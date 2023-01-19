const chalk = require("chalk");
const readline = require("readline-sync");

const { copyFileSync } = require("fs");
const path = require("path");

const copyfile = (src, dest) => {
  if (!src || !dest) {
    console.log(
      `You must specify the source/destination. Example: ${chalk.yellow(
        "copyfile test.txt D:\\test.txt"
      )}.`
    );
    console.log();

    return;
  }

  console.log("Disclaimer: This command is very unstable.\n");

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
    console.log();

    return;
  }

  try {
    copyFileSync(srcPath, destPath);

    console.log(chalk.italic.blueBright("Please wait...\n"));

    console.log(chalk.green("The operation completed successfully.\n"));
  } catch (err) {
    if (err.code === "EPERM") {
      console.log(
        chalk.red(
          `You do not have permission to copy to: ${chalk.bold(destPath)}. Try another path.\n`
        )
      );
    } else if (err.code === "ENOENT") {
      console.log(
        chalk.red(
          `The source or destination folder (or file, source) is non-existant. Please confirm that they exist.\n`
        )
      );
    } else {
      console.log(
        chalk.red(
          `An unknown error occured while copying from ${chalk.bold(srcPath)} to ${chalk.bold(
            destPath
          )}.\n`
        )
      );
    }
  }
};

module.exports = copyfile;
