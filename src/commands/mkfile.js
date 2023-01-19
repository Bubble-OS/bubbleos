const chalk = require("chalk");
const readline = require("readline-sync");

const fs = require("fs");
const path = require("path");

const mkfile = (fileNameParam) => {
  if (typeof fileNameParam === "undefined") {
    console.log(`Please enter a file name to create. Example: ${chalk.yellow("mkfile test.txt")}.`);
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

  const contents = readline.question(
    `Please enter the file contents (or press 'Enter' to make a blank file): `
  );

  console.log(`\nMaking file: ${chalk.bold.blueBright(fileName)}...`);

  try {
    if (!fs.existsSync(fileName)) {
      fs.writeFileSync(fileName, contents);
      console.log(chalk.green("The operation completed successfully.\n"));
    } else {
      console.log(
        chalk.red(`The file already exists in the current directory: ${chalk.bold(fileName)}.\n`)
      );
    }
  } catch (err) {
    if (err.message.includes("EPERM")) {
      console.log(
        chalk.red(
          `You do not have permission to create a file in the folder: ${chalk.bold(fileName)}.\n`
        )
      );
    } else {
      console.log(
        chalk.red(`An unknown error occured while creating the file: ${chalk.bold(fileName)}.\n`)
      );
    }
  }
};

module.exports = mkfile;
