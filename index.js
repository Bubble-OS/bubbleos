#!/usr/bin/env node

const chalk = require("chalk");

const { GLOBAL_NAME, AUTHOR, VERSION, BUILD } = require("./src/variables/aboutConsts");

// Import private helper functions
const _mainArgs = require("./src/functions/mainArgs");
const _timebomb = require("./src/functions/timebomb");
const _fatalError = require("./src/functions/fatalError");

// Import helper functions
const prompt = require("./src/prompt");
const intCmds = require("./src/interpret");

// Get all of the arguments passed directly into BubbleOS
const args = _mainArgs();

let command = "";
let showTimebomb = true;
let showVersion = false;
let killBubble = false;

if (args.length !== 0) {
  if (args.includes("--no-timebomb") || args.includes("/no-timebomb")) showTimebomb = false;
  if (
    args.includes("-v") ||
    args.includes("/v") ||
    args.includes("--version") ||
    args.includes("/version")
  )
    showVersion = true;
  if (args.includes("--kill") || args.includes("/kill")) killBubble = true;

  command = args
    .filter((v) => {
      if (v.startsWith("-") || v.startsWith("/")) return false;
      return true;
    })
    .join(" ");
}

if (showTimebomb) _timebomb();

if (killBubble) {
  try {
    throw new Error("BubbleOS was run with the --kill flag.");
  } catch (err) {
    _fatalError(err);
  }
}

if (showVersion) {
  console.log(chalk.bold(`${GLOBAL_NAME}, v${VERSION} (build ${BUILD})`));
  console.log(`Made by ${AUTHOR}!\n`);

  process.exit(0);
}

if (command.length !== 0) {
  intCmds(command);
  process.exit(0);
}

require("./src/intro");

// Repeat until the user exits
while (true) {
  // Ask the user for a command
  intCmds(prompt());
}
