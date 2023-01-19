const chalk = require("chalk");
const readline = require("readline-sync");

const fs = require("fs");

const mkfile = (fileName) => {
  if (typeof fileName === "undefined") {
    console.log(`Please enter a file name to create. Example: ${chalk.yellow("mkfile test.txt")}.`);
    console.log();
    return;
  }

  const contents = readline.question(
    `Please enter the file contents (or press 'Enter' to make a blank file): `
  );

  console.log(`\nMaking file: ${chalk.bold.blueBright(process.cwd() + "\\" + fileName)}...`);

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
          `You do not have permission to create a file in the folder: ${chalk.bold(
            process.cwd()
          )}.\n`
        )
      );
    } else {
      console.log(
        chalk.red(
          `An unknown error occured while creating the file: ${chalk.bold(
            process.cwd() + "\\" + fileName
          )}.\n`
        )
      );
    }
  }
};

module.exports = mkfile;
