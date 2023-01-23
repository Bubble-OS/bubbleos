const chalk = require("chalk");
const { isText } = require("istextorbinary");

const fs = require("fs");
const path = require("path");

const _errorInterpret = require("../functions/errorInt");

const wcount = (file) => {
  if (typeof file === "undefined") {
    _errorInterpret("0x0047");
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
    _errorInterpret("0x0048", { variable: fileName });
    return;
  }

  try {
    if (!isText(fileName, fs.readFileSync(fileName, { flag: "r" }))) {
      _errorInterpret("0x0049");
      return;
    }

    console.log(chalk.italic.blueBright("Please wait..."));

    const fileContents = fs.readFileSync(fileName, { encoding: "utf-8", flag: "r" });
    console.log(`Characters (including whitespace): ${chalk.bold(fileContents.length)}`);
    console.log(`Words: ${chalk.bold(fileContents.split(" ").length)}\n`);
  } catch (err) {
    if (err.code === "EISDIR") {
      _errorInterpret("0x0050", { variable: fileName });
    } else {
      _errorInterpret("0x0051", { variable: fileName, wordCode: err.code });
    }
  }
};

module.exports = wcount;
