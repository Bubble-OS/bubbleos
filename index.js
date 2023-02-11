#!/usr/bin/env node

// Import some private helper functions
import _singleParam from "./src/functions/singleParam.js";
import _multiParam from "./src/functions/multiParam.js";
import _errorInterpret from "./src/functions/errorInt.js";
import _mainArgs from "./src/functions/mainArgs.js";
import _intro from "./src/intro.js";

// Importing some more main commands
import prompt from "./src/prompt.js";

import intCmds from "./src/interpret.js";

const args = _mainArgs();
if (args.length !== 0) {
  const command = args.filter((v) => {
    if (v.startsWith("-") || v.startsWith("/")) return false;
    return true;
  });

  intCmds(command.join(" "), false);
  process.exit(0);
} else {
  _intro();

  // Repeat until the user exits
  while (true) {
    // Ask the user for a command
    const { command, isEmpty } = prompt();

    intCmds(command, isEmpty);
  }
}
