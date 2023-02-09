import chalk from "chalk";

import _errorInterpret from "../functions/errorInt.js";
import _fatalError from "../functions/fatalError.js";

const taskkill = (pid) => {
  if (typeof pid === "undefined") {
    _errorInterpret(2, { type: "a PID", example: "taskkill 1234" });
    return;
  }

  const isNumeric = (str) => {
    if (typeof str !== "string") return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
  };

  if (!isNumeric(pid)) {
    _errorInterpret(10, {
      type: "PID",
      supposedTo: "numbers",
      notContain: "letters/symbols",
      variable: pid,
    });
    return;
  }

  console.log(`Killing process with PID ${chalk.yellow(pid)}...`);

  try {
    process.kill(Number(pid));
    console.log(`Successfully killed process ${chalk.green(pid)}.\n`);
  } catch (err) {
    if (err.code === "EPERM") {
      _errorInterpret(4, { todo: "kill the process with PID", variable: pid });
    } else {
      _fatalError(err);
    }
  }
};

export default taskkill;
