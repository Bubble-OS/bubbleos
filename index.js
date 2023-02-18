#!/usr/bin/env node

const _mainArgs = require("./src/functions/mainArgs");

const prompt = require("./src/prompt");
const intCmds = require("./src/interpret");

const timebomb = require("./src/functions/timebomb");

const args = _mainArgs();

let command = "";
let showTimebomb = true;
if (args.length !== 0) {
  if (args.includes("--no-timebomb") || args.includes("/no-timebomb")) {
    showTimebomb = false;
  }

  command = args.filter((v) => {
    if (v.startsWith("-") || v.startsWith("/")) return false;
    return true;
  });
}

if (showTimebomb) timebomb();

if (command.length !== 0) {
  intCmds(command.join(" "));
  process.exit(0);
}

if (showTimebomb) timebomb();

require("./src/intro");

// Repeat until the user exits
while (true) {
  // Ask the user for a command
  intCmds(prompt());
}
