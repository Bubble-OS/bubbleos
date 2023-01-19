#!/usr/bin/env node

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

require("./src/intro");

while (true) {
  const command = prompt();

  error(command);

  if (command.isExit) {
    require("./src/exit");
  } else if (command.command.startsWith("help")) {
    const helpCommand = command.command.replace("help ", "").startsWith("help")
      ? undefined
      : command.command.replace("help ", "");

    help(helpCommand);
  } else if (command.command.startsWith("cd")) {
    const directory = command.command.replace("cd ", "");

    cd(directory);
  } else if (command.command.startsWith("ls")) {
    const directory = command.command.replace("ls ", "").startsWith("ls")
      ? process.cwd()
      : command.command.replace("ls ", "");

    ls(directory);
  } else if (command.command.startsWith("sysinfo")) {
    const all = command.command.includes("-a");

    all ? sysinfo(true) : sysinfo();
  } else if (command.command.startsWith("taskkill")) {
    const pid = command.command.replace("taskkill ", "").startsWith("taskkill")
      ? undefined
      : command.command.replace("taskkill ", "");

    taskkill(pid);
  } else if (command.command.startsWith("cls")) {
    console.clear();
  } else if (command.command.startsWith("mkdir")) {
    const mkdirName = command.command.replace("mkdir ", "").startsWith("mkdir")
      ? undefined
      : command.command.replace("mkdir ", "");

    mkdir(mkdirName);
  } else if (command.command.startsWith("exec")) {
    const execFilename = command.command.replace("exec ", "").startsWith("exec")
      ? undefined
      : command.command.replace("exec ", "");

    execFile(execFilename);
  } else if (command.command.startsWith("about")) {
    about();
  } else if (command.command.startsWith("rmdir")) {
    const rmdirFile = command.command.replace("rmdir ", "").startsWith("rmdir")
      ? undefined
      : command.command.replace("rmdir ", "");

    rmdir(rmdirFile);
  } else if (command.command.startsWith("mkfile")) {
    const mkfileName = command.command.replace("mkfile ", "").startsWith("mkfile")
      ? undefined
      : command.command.replace("mkfile ", "");

    mkfile(mkfileName);
  } else if (command.command.startsWith("rmfile")) {
    const rmfilename = command.command.replace("rmfile ", "").startsWith("rmfile")
      ? undefined
      : command.command.replace("rmfile ", "");

    rmfile(rmfilename);
  }
}
