const chalk = require("chalk");

const fs = require("fs");

const _replaceSpaces = require("../functions/replaceSpaces");
const _convertAbsolute = require("../functions/convAbs");

const Errors = require("../classes/Errors");
const _fatalError = require("../functions/fatalError");

const rename = (file, renamed) => {
  file = _replaceSpaces(file);
  renamed = _replaceSpaces(renamed);

  if (!file || !renamed) {
    Errors.enterParameter("the filename and the new name", "rename hello.txt world.txt");
    return;
  } else if (file.trim() === renamed.trim()) {
    console.log(chalk.yellow("The old filename and the new filename cannot be the same name.\n"));
    return;
  }

  const fileName = _convertAbsolute(file.trim());
  const renamedName = _convertAbsolute(renamed.trim());

  if (!fs.existsSync(fileName)) {
    Errors.doesNotExist("file", fileName);
    return;
  }

  try {
    fs.renameSync(fileName, renamedName);
    console.log(chalk.green("The operation completed successfully.\n"));
  } catch (err) {
    if (err.code === "EPERM") {
      Errors.noPermissions("copy the file/read the directory", `${fileName}/${renamedName}`);
    } else if (err.code === "EBUSY") {
      Errors.inUse("file/folder", `${fileName}/${renamedName}`);
    } else {
      _fatalError(err);
    }
  }
};

module.exports = rename;
