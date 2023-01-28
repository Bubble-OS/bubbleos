const chalk = require("chalk");

const _errorInterpret = require("../functions/errorInt");

const cd = (dir) => {
  if (dir === "") {
    _errorInterpret("0x0002");
    return;
  }

  try {
    process.chdir(dir);
  } catch (err) {
    if (err.code === "ENOENT") {
      _errorInterpret("0x0003", { variable: dir });
    } else if (err.code === "EPERM") {
      _errorInterpret("0x0004", { variable: dir });
    } else {
      _errorInterpret("0x0005", {
        variable: dir,
        wordCode: err.code,
      });
    }
    return;
  }

  console.log(`Changed directory to ${chalk.green(process.cwd())}.\n`);
};

module.exports = cd;
