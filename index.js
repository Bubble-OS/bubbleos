#!/usr/bin/env node

// Import some private helper functions
const _singleParam = require("./src/functions/singleParam");
const _errorInterpret = require("./src/functions/errorInt");

// Importing some more main commands
const prompt = require("./src/prompt");
const error = require("./src/error");
const help = require("./src/help");

// Importing all of the commands
const cd = require("./src/commands/cd");
const ls = require("./src/commands/ls");
const sysinfo = require("./src/commands/sysinfo");
const taskkill = require("./src/commands/taskkill");
const mkdir = require("./src/commands/mkdir");
const execFile = require("./src/commands/exec");
const about = require("./src/commands/about");
const rmdir = require("./src/commands/rmdir");
const mkfile = require("./src/commands/mkfile");
const rmfile = require("./src/commands/rmfile");
const readfile = require("./src/commands/readfile");
const copyfile = require("./src/commands/copyfile");

// Running the introduction one-time
require("./src/intro");

// Repeat until the user exists
while (true) {
  // Ask the user for a command
  const { command, isEmpty, isExit } = prompt();

  // If the command is empty, throw an error
  error(isEmpty);

  if (isExit) {
    // If the user typed in 'exit'
    require("./src/exit");
  } else if (command.startsWith("help")) {
    help(_singleParam(command, "help"));
  } else if (command.startsWith("cd")) {
    cd(_singleParam(command, "cd"));
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
    // No params required
    about();
  } else if (command.startsWith("rmdir")) {
    rmdir(_singleParam(command, "rmdir"));
  } else if (command.startsWith("mkfile")) {
    mkfile(_singleParam(command, "mkfile"));
  } else if (command.startsWith("rmfile")) {
    rmfile(_singleParam(command, "rmfile"));
  } else if (command.startsWith("readfile")) {
    readfile(_singleParam(command, "readfile"));
  } else if (command.startsWith("copyfile")) {
    const params = command.split(" ");
    copyfile(params[1], params[2]);
  } else {
    // If the command didn't match any of the above, throw an unrecognized command error
    if (command !== "") {
      _errorInterpret("0x0001", { variable: command });
    }
  }
}
