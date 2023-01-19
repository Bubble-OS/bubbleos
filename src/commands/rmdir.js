const chalk = require("chalk");
const readline = require("readline-sync");

const fs = require("fs");
const path = require("path");

const rmdir = (dir) => {
  if (typeof dir === "undefined") {
    console.log(`Please enter a folder to delete. Example: ${chalk.yellow("rmdir test")}.`);
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

  const confirmText = readline
    .question(
      `Are you sure you want to delete the directory: ${chalk.bold(directory)}? [${chalk.green(
        "y"
      )}/${chalk.red.bold("N")}] `
    )
    .toLowerCase();
  if (confirmText.includes("n") || !confirmText.includes("y")) {
    console.log(chalk.yellow(`Operation cancelled.`));
    console.log();

    return;
  }

  console.log(`\nDeleting directory: ${chalk.bold.blueBright(directory)}...`);

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
