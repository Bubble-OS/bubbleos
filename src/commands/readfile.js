const chalk = require("chalk");

const fs = require("fs");
const path = require("path");

const readfile = (file) => {
  if (typeof file === "undefined") {
    console.log(
      `Please enter a file to view. Example: ${chalk.yellow(
        "readfile 3d-space-cadet-pinball.txt"
      )}.`
    );
    console.log();

    return;
  }

  const isAbsolutePath = path.isAbsolute(file);
  let fileName = "";
  if (!isAbsolutePath) {
    fileName = process.cwd() + "\\" + file;
  } else {
    fileName = file;
  }

  if (!fs.existsSync(fileName)) {
    console.log(chalk.red(`The file, ${chalk.bold(fileName)}, does not exist.`));
    console.log();

    return;
  }

  console.log(chalk.bold.underline.redBright(`${file} Contents\n`));

  try {
    console.log(fs.readFileSync(fileName, { encoding: "utf-8", flag: "r" }));
    console.log();
  } catch (err) {
    if (err.code === "EISDIR") {
      console.log(
        chalk.red(
          `You cannot view directories using 'readfile' (use 'ls' for that). If a file and folder name are the same, try specifing the extention to get the file contents.\nError while reading directory: ${chalk.bold(
            fileName
          )}\n`
        )
      );
    } else {
      console.log(chalk.red(`An unknown error occurred while reading file ${fileName}.\n`));
    }
  }
};

module.exports = readfile;
