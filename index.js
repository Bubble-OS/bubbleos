#!/usr/bin/env node

// Import some private helper functions
const _singleParam = require("./src/functions/singleParam");
const _multiParam = require("./src/functions/multiParam");
const _errorInterpret = require("./src/functions/errorInt");

// Importing some more main commands
const prompt = require("./src/prompt");
const help = require("./src/help");

// Importing all of the commands
const cd = require("./src/commands/cd");
const ls = require("./src/commands/ls");
const sysinfo = require("./src/commands/sysinfo");
const taskkill = require("./src/commands/taskkill");
const mkdir = require("./src/commands/mkdir");
const execFile = require("./src/commands/exec");
const about = require("./src/commands/about");
const mkfile = require("./src/commands/mkfile");
const readfile = require("./src/commands/readfile");
const copyfile = require("./src/commands/copyfile");
const printText = require("./src/commands/print");
const userinfocmd = require("./src/commands/userinfo");
const wcount = require("./src/commands/wcount");
const del = require("./src/commands/del");
const size = require("./src/commands/size");
const rename = require("./src/commands/rename");
const time = require("./src/commands/time");
const { _addToHist, historyCmd } = require("./src/commands/history");

// Running the introduction one-time
require("./src/intro");

// Repeat until the user exits
while (true) {
  // Ask the user for a command
  const { command, isEmpty, isExit } = prompt();

  // If the command is empty, throw an error
  if (isEmpty) _errorInterpret("0x0000");

  if (isExit) {
    // If the user typed in 'exit'
    require("./src/exit");
  } else if (command.startsWith("help")) {
    help(_singleParam(command, "help"));
  } else if (command.startsWith("cd")) {
    const cdCommands = _multiParam(command);
    let cdVerbose = false;
    let cdPath = "";

    if (cdCommands[cdCommands.length - 1] === "--verbose") {
      cdCommands.pop();
      cdVerbose = true;
    } else {
      cdVerbose = false;
    }

    cdPath = cdCommands.join(" ");
    cd(cdPath, cdVerbose);
  } else if (command.startsWith("ls")) {
    ls(_singleParam(command, "ls"));
  } else if (command.startsWith("sysinfo")) {
    command.includes("-a") ? sysinfo(true) : sysinfo();
  } else if (command.startsWith("taskkill")) {
    taskkill(_singleParam(command, "taskkill"));
  } else if (command.startsWith("cls")) {
    // Simple enough that it doesn't need its own file
    console.clear();
  } else if (command.startsWith("mkdir")) {
    mkdir(_singleParam(command, "mkdir"));
  } else if (command.startsWith("exec")) {
    execFile(_singleParam(command, "exec"));
  } else if (command.startsWith("about")) {
    about();
  } else if (command.startsWith("mkfile")) {
    mkfile(_singleParam(command, "mkfile"));
  } else if (command.startsWith("readfile")) {
    readfile(_singleParam(command, "readfile"));
  } else if (command.startsWith("copyfile")) {
    const params = command.split(" ");
    copyfile(params[1], params[2]);
  } else if (command.startsWith("print")) {
    printText(_singleParam(command, "print"));
  } else if (command.startsWith("userinfo")) {
    userinfocmd();
  } else if (command.startsWith("wcount")) {
    wcount(_singleParam(command, "wcount"));
  } else if (command.startsWith("del")) {
    del(_singleParam(command, "del"));
  } else if (command.startsWith("tasklist")) {
    console.log("This command did not work so I removed it :(\n    - Arnav, the dev\n");
  } else if (command.startsWith("size")) {
    size(_singleParam(command, "size"));
  } else if (command.startsWith("rename")) {
    const params = command.split(" ");
    rename(params[1], params[2]);
  } else if (command.startsWith("time") || command.startsWith("date")) {
    time();
  } else if (command.startsWith("history")) {
    historyCmd(_singleParam(command, "history"));
  } else {
    // If the command didn't match any of the above, throw an unrecognized command error
    if (command !== "") {
      _errorInterpret("0x0001", { variable: command });
    }
  }

  if (!isEmpty) _addToHist(command);
}
