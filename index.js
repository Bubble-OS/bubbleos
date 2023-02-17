#!/usr/bin/env node

const _mainArgs = require("./src/functions/mainArgs");

const prompt = require("./src/prompt");
const intCmds = require("./src/interpret");

const args = _mainArgs();

if (args.length !== 0) {
  const command = args.filter((v) => {
    if (v.startsWith("-") || v.startsWith("/")) return false;
    return true;
  });

  intCmds(command.join(" "));
  process.exit(0);
} else {
  require("./src/intro");

  // Repeat until the user exits
  while (true) {
    // Ask the user for a command
    intCmds(prompt());
  }
}
