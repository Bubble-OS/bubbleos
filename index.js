#!/usr/bin/env node

const prompt = require("./src/prompt");

const error = require("./src/error");

const cd = require("./src/commands/cd");
const ls = require("./src/commands/ls");
const sysinfo = require("./src/commands/sysinfo");
const taskkill = require("./src/commands/taskkill");

require("./src/intro");

while (true) {
  const command = prompt();

  error(command);

  if (command.isExit) {
    require("./src/exit");
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
  }
}
