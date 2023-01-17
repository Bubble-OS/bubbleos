#!/usr/bin/env node

const prompt = require("./src/prompt");

const error = require("./src/error");

const cd = require("./src/commands/cd");
const ls = require("./src/commands/ls");
const sysinfo = require("./src/commands/sysinfo");
const taskkill = require("./src/commands/taskkill");
const mkdir = require("./src/commands/mkdir");
const execFile = require("./src/commands/exec");

require("./src/intro");

while (true) {
  const command = prompt();

  error(command);

  if (command.isExit) {
    require("./src/exit");
  } else if (command.isHelp) {
    require("./src/help");
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
  } else if (command.command.startsWith("mkfile")) {
    const fileName = command.command.replace("mkfile ", "");

    console.log(fileName);
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
  }
}
