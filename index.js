#!/usr/bin/env node

const _singleParam = require("./src/functions/singleParam");

const prompt = require("./src/prompt");

const error = require("./src/error");

const help = require("./src/help");

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

require("./src/intro");

while (true) {
  const { command, isEmpty, isExit, isHelp } = prompt();

  error(command);

  if (isExit) {
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
    console.clear();
  } else if (command.startsWith("mkdir")) {
    mkdir(_singleParam(command, "mkdir"));
  } else if (command.startsWith("exec")) {
    execFile(_singleParam(command, "exec"));
  } else if (command.startsWith("about")) {
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
    const params = command.command.split(" ");
    copyfile(params[1], params[2]);
  }
}
