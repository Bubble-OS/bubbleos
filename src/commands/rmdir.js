const chalk = require("chalk");
const readline = require("readline-sync");

const fs = require("fs");
const path = require("path");

const _errorInterpret = require("../functions/errorInt");

const rmdir = (dir) => {
  if (typeof dir === "undefined") {
    _errorInterpret("0x0029");
    return;
  }

  const isAbsolutePath = path.isAbsolute(dir);

  const newDir = dir.startsWith("/") ? dir.replace("/", "") : dir;
  const newerDir = newDir.startsWith("\\") ? newDir.replace("\\", "") : newDir;
  const directory = isAbsolutePath ? newerDir : process.cwd() + "\\" + newerDir;

  if (!fs.existsSync(directory)) {
    _errorInterpret("0x0030", { variable: directory });
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
    _errorInterpret("0x0031");
    return;
  }

  console.log(`\nDeleting directory: ${chalk.bold.blueBright(directory)}...`);

  try {
    fs.rmSync(directory, { recursive: true, force: true });

    console.log(chalk.green("The operation completed successfully.\n"));
  } catch (err) {
    if (err.code === "EBUSY") {
      _errorInterpret("0x0032", { variable: directory });
    } else if (err.code === "EPERM") {
      _errorInterpret("0x0033", { variable: directory });
    } else {
      _errorInterpret("0x0034", { variable: directory, wordCode: err.code });
    }
  }
};

module.exports = rmdir;
