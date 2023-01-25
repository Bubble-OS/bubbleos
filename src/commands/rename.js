const chalk = require("chalk");

const fs = require("fs");

const _errorInterpret = require("../functions/errorInt");
const _convertAbsolute = require("../functions/convAbs");

const rename = (file, renamed) => {
  if (!file || !renamed) {
    _errorInterpret("0x0051");
    return;
  } else if (file.trim() === renamed.trim()) {
    _errorInterpret("0x0052", { variable: `${file} to ${renamed}` });
    return;
  }

  const fileName = _convertAbsolute(file.trim());
  const renamedName = _convertAbsolute(renamed.trim());

  if (!fs.existsSync(fileName)) {
    _errorInterpret("0x0053", { variable: fileName });
    return;
  }

  try {
    fs.renameSync(fileName, renamedName);
    console.log(chalk.green("The operation completed successfully.\n"));
  } catch (err) {
    if (err.code === "EPERM") {
      _errorInterpret("0x0054", {
        variable: fileName,
      });
    } else if (err.code === "EBUSY") {
      _errorInterpret("0x0055", {
        variable: fileName,
      });
    } else {
      _errorInterpret("0x0056", {
        variable: fileName,
        wordCode: err.code,
      });
    }
  }
};

module.exports = rename;
