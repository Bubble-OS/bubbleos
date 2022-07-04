#!/usr/bin/env node

const prompt = require("./src/prompt");

const error = require("./src/error");

const cd = require("./src/commands/cd");
const ls = require("./src/commands/ls");
const sysinfo = require("./src/commands/sysinfo");

require("./src/intro");

while (true) {
  const command = prompt();

  error(command);

  if (command.isExit) {
    require("./src/exit");
  }

  if (command.command.startsWith("cd")) {
    const directory = command.command.replace("cd ", "");

    cd(directory);
  }

  if (command.command.startsWith("ls")) {
    const directory = command.command.replace("ls ", "").startsWith("ls")
      ? process.cwd()
      : command.command.replace("ls ", "");

    ls(directory);
  }

  if (command.command.startsWith("sysinfo")) {
    const all = command.command.includes("-a");

    all ? sysinfo(true) : sysinfo();
  }
}
