import chalk from "chalk";

import { execFile as exec } from "child_process";
import { existsSync } from "fs";

import _errorInterpret from "../functions/errorInt.js";
import _fatalError from "../functions/fatalError.js";

import _replaceSpaces from "../functions/replaceSpaces.js";
import _convertAbsolute from "../functions/convAbs.js";

// Named 'execFile' to avoid naming conflicts
const execFile = (execFilename) => {
  execFilename = _replaceSpaces(execFilename);

  if (typeof execFilename === "undefined") {
    _errorInterpret(2, { type: "a file", example: "exec test" });
    return;
  } else if (process.platform !== "win32") {
    _errorInterpret(5, { os: "Windows" });
    return;
  }

  const execFilenameExe = execFilename.endsWith(".exe") ? execFilename : `${execFilename}.exe`;
  const fullPath = _convertAbsolute(execFilenameExe);

  if (!existsSync(fullPath)) {
    _errorInterpret(3, { type: "file", variable: fullPath });
    return;
  }

  try {
    console.log(`Executing file: ${chalk.bold.blueBright(fullPath)}...`);
    exec(fullPath, () => {});
    console.log(chalk.green("Executed successfully.\n"));
  } catch (err) {
    _fatalError(err);
  }
};

export default execFile;
