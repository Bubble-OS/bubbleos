const chalk = require("chalk");
const fs = require("fs");

const mkdir = (dirName) => {
  if (typeof dirName === "undefined") {
    console.log(`Please enter a directory name to create. Example: ${chalk.yellow("mkdir Test")}.`);
    console.log();

    return;
  }

  const dir = `./${dirName}`;

  console.log(`Making directory: ${chalk.bold.blueBright(process.cwd() + "\\" + dirName)}...`);

  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);

      console.log(chalk.green("The operation completed successfully.\n"));
    } else {
      console.log(
        chalk.red(`The folder already exists in the current directory: ${chalk.bold(dirName)}.\n`)
      );
    }
  } catch (err) {
    if (err.message.includes("EPERM")) {
      console.log(
        chalk.red(
          `You do not have permission to write to the folder: ${chalk.bold(
            process.cwd() + "\\" + dirName
          )}. Try running Bubble as an administrator.\n`
        )
      );
    } else {
      console.log(
        chalk.red(
          `An unknown error occured while creating the folder: ${chalk.bold(
            process.cwd() + "\\" + dirName
          )}.\n`
        )
      );
    }
  }
};

module.exports = mkdir;
