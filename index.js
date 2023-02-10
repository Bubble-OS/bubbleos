#!/usr/bin/env node

// Import some private helper functions
import _singleParam from "./src/functions/singleParam.js";
import _multiParam from "./src/functions/multiParam.js";
import _errorInterpret from "./src/functions/errorInt.js";

// Importing some more main commands
import prompt from "./src/prompt.js";

// Running the introduction one-time
import "./src/intro.js";
import intCmds from "./src/interpret.js";

// Repeat until the user exits
while (true) {
  // Ask the user for a command
  const { command, isEmpty } = prompt();

  intCmds(command, isEmpty);
}
