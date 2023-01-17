const chalk = require("chalk");
const exec = require("child_process").execFile;
const fs = require("fs");

// Named 'execFile' to avoid naming conflicts
const execFile = (execFilename) => {
  if (typeof execFilename === "undefined") {
    console.log(
      `Please enter a valid file name to execute. Example: ${chalk.yellow("exec explorer")}.`
    );
    console.log();

    return;
  } else if (process.platform !== "win32") {
    console.log(chalk.red("This command only works with the Windows operating system."));
    console.log();

    return;
  }

  const execFilenameExe = execFilename.endsWith(".exe") ? execFilename : `${execFilename}.exe`;

  if (!fs.existsSync(execFilenameExe)) {
    console.log(
      chalk.red(`The file, ${chalk.bold(process.cwd() + "\\" + execFilenameExe)}, does not exist.`)
    );
    console.log();

    return;
  }

  console.log(
    `Executing file: ${chalk.bold.blueBright(process.cwd() + "\\" + execFilenameExe)}...`
  );

  try {
    exec(execFilenameExe, (err, data) => {});

    console.log(chalk.green("Executed successfully.\n"));
  } catch (err) {
    console.log(chalk.red("Execution failed for an unknown reason.\n"));
  }
};

module.exports = execFile;
