const fs = require("fs");

const chalk = require("chalk");

const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");

const _fatalError = require("../functions/fatalError");

const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");

const _interpretBubbleFile = (
  intCmds,
  path,
  options = { displayCommand: true, allowExit: false }
) => {
  const contents = fs.readFileSync(path, { encoding: "utf-8", flag: "r" }).split("\n");

  for (let i = 0; i < contents.length; i++) {
    const line = contents[i]?.trim();
    if (line.startsWith("#") || line === "") {
      continue;
    } else if (line.startsWith("exit") && !options.allowExit) {
      console.log(
        chalk.yellow(
          `${chalk.bold(
            `Message from ${chalk.italic("'bub'")}:`
          )} You cannot run the ${chalk.italic("'exit'")} command from a ${chalk.italic(
            "'.bub'"
          )} file.\n`
        )
      );
      continue;
    }

    if (options.displayCommand) console.log(chalk.italic.underline.bold.red(line));
    intCmds(line);
  }
};

const bub = (intCmds, file, ...args) => {
  try {
    let fileChk = new Checks(file);

    const displayCommand = !(args?.includes("-d") || args?.includes("/d"));
    const allowExit = args?.includes("--allow-exit") || args?.includes("/allow-exit");

    if (fileChk.paramUndefined()) {
      Errors.enterParameter("a file", "bub test.bub");
      return;
    }

    file = _replaceSpaces(file);
    file = file.endsWith(".bub") ? file : `${file}.bub`;
    file = _convertAbsolute(file);

    fileChk = new Checks(file);

    if (!fileChk.doesExist()) {
      Errors.doesNotExist("file", file);
      return;
    } else if (fileChk.validateType()) {
      Errors.expectedFile(file);
      return;
    } else if (!fileChk.validEncoding()) {
      Errors.invalidEncoding("plain text");
      return;
    }

    _interpretBubbleFile(intCmds, file, { displayCommand, allowExit });
  } catch (err) {
    _fatalError(err);
  }
};

module.exports = bub;
