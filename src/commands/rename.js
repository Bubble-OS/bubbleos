const chalk = require("chalk");

const fs = require("fs");

const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");

const _errorInterpret = require("../functions/errorInt");
const _fatalError = require("../functions/fatalError");

const rename = (file, renamed) => {
  file = _replaceSpaces(file);
  renamed = _replaceSpaces(renamed);

  if (!file || !renamed) {
    _errorInterpret(39);
    return;
  } else if (file.trim() === renamed.trim()) {
    _errorInterpret(40, { variable: `${file} to ${renamed}` });
    return;
  }

  const fileName = _convertAbsolute(file.trim());
  const renamedName = _convertAbsolute(renamed.trim());

  if (!fs.existsSync(fileName)) {
    _errorInterpret(41, { variable: fileName });
    return;
  }

  try {
    fs.renameSync(fileName, renamedName);
    console.log(chalk.green("The operation completed successfully.\n"));
  } catch (err) {
    if (err.code === "EPERM") {
      _errorInterpret(42, {
        variable: fileName,
      });
    } else if (err.code === "EBUSY") {
      _errorInterpret(43, {
        variable: fileName,
      });
    } else {
      _fatalError(err);
    }
  }
};

module.exports = rename;
