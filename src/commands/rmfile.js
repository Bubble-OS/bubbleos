const chalk = require("chalk");
const readline = require("readline-sync");

const fs = require("fs");
const path = require("path");

const rmfile = (fileNameParam) => {
  if (typeof fileNameParam === "undefined") {
    console.log(`Please enter a file name to delete. Example: ${chalk.yellow("rmfile test.txt")}.`);
    console.log();
    return;
  }

  const isAbsolutePath = path.isAbsolute(fileNameParam);
  let fileName = "";
  if (!isAbsolutePath) {
    fileName = process.cwd() + "\\" + fileNameParam;
  } else {
    fileName = fileNameParam;
  }

  if (!fs.existsSync(fileName)) {
    console.log(chalk.red(`The file, ${chalk.bold(fileName)}, does not exist.`));
    console.log();

    return;
  }

  const confirmText = readline
    .question(
      `Are you sure you want to delete the file: ${chalk.bold(fileName)}? [${chalk.green(
        "y"
      )}/${chalk.red.bold("N")}] `
    )
    .toLowerCase();
  if (confirmText.includes("n") || !confirmText.includes("y")) {
    console.log(chalk.yellow(`Operation cancelled.`));
    console.log();

    return;
  }

  console.log(`\nDeleting file: ${chalk.bold.blueBright(fileName)}...`);

  try {
    fs.unlinkSync(fileName);

    console.log(chalk.green("The operation completed successfully.\n"));
  } catch (err) {
    if (err.code === "EBUSY") {
      console.log(
        chalk.red(
          `The file, ${chalk.bold(
            fileName
          )}, is being used by another program. End the program and try again.\n`
        )
      );
    } else if (err.code === "EPERM") {
      console.log(
        chalk.red(`You do not have permission to delete the file ${chalk.bold(fileName)}.\n`)
      );
    } else {
      console.log(
        chalk.red(`An unknown error occured while creating the file: ${chalk.bold(fileName)}.\n`)
      );
    }
  }
};

module.exports = rmfile;
