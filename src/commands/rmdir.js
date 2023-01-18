const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

const rmdir = (dir) => {
  if (typeof dir === "undefined") {
    console.log(`Please enter folder to delete. Example: ${chalk.yellow("rmdir test")}.`);
    console.log();

    return;
  }

  const isAbsolutePath = path.isAbsolute(dir);

  const newDir = dir.startsWith("/") ? dir.replace("/", "") : dir;
  const newerDir = newDir.startsWith("\\") ? newDir.replace("\\", "") : newDir;
  const directory = isAbsolutePath ? newerDir : process.cwd() + "\\" + newerDir;

  if (!fs.existsSync(directory)) {
    console.log(chalk.red(`The folder, ${chalk.bold(directory)}, does not exist.`));
    console.log();

    return;
  }

  console.log(`Deleting directory: ${chalk.bold.blueBright(directory)}...`);

  try {
    fs.rmSync(directory, { recursive: true, force: true });

    console.log(chalk.green("The operation completed successfully.\n"));
  } catch (err) {
    if (err.code === "EBUSY") {
      console.log(
        chalk.red(
          `The folder, ${chalk.bold(
            directory
          )}, is being used by another program. End the program and try again.\n`
        )
      );
    } else if (err.code === "EPERM") {
      console.log(
        chalk.red(`You do not have permission to delete the folder ${chalk.bold(directory)}.\n`)
      );
    } else {
      console.log(
        chalk.red(`An unknown error occured while creating the folder: ${chalk.bold(directory)}.\n`)
      );
    }
  }
};

module.exports = rmdir;
