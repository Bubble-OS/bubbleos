#!/usr/bin/env node

// Import some private helper functions
import _singleParam from "./src/functions/singleParam.js";
import _multiParam from "./src/functions/multiParam.js";
import _errorInterpret from "./src/functions/errorInt.js";

// Importing some more main commands
import prompt from "./src/prompt.js";
import help from "./src/help.js";

// Importing all of the commands
import cd from "./src/commands/cd.js";
import ls from "./src/commands/ls.js";
import sysinfo from "./src/commands/sysinfo.js";
import taskkill from "./src/commands/taskkill.js";
import mkdir from "./src/commands/mkdir.js";
import execFile from "./src/commands/exec.js";
import about from "./src/commands/about.js";
import mkfile from "./src/commands/mkfile.js";
import readfile from "./src/commands/readfile.js";
import copyfile from "./src/commands/copyfile.js";
import printText from "./src/commands/print.js";
import userinfocmd from "./src/commands/userinfo.js";
import wcount from "./src/commands/wcount.js";
import del from "./src/commands/del.js";
import size from "./src/commands/size.js";
import rename from "./src/commands/rename.js";
import time from "./src/commands/time.js";
import date from "./src/commands/date.js";
import { _addToHist, historyCmd } from "./src/commands/history.js";
import fif from "./src/commands/fif.js";
import ifnet from "./src/commands/ifnet.js";

// Running the introduction one-time
import "./src/intro.js";

// Repeat until the user exits
while (true) {
  // Ask the user for a command
  const { command, isEmpty, isExit } = prompt();

  // If the command is empty, throw an error
  if (isEmpty) _errorInterpret(0);

  if (isExit) {
    // If the user typed in 'exit'
    require("./src/exit");
  } else if (command.startsWith("help")) {
    help(_singleParam(command, "help"));
  } else if (command.startsWith("cd")) {
    cd(..._multiParam(command));
  } else if (command.startsWith("ls")) {
    ls(..._multiParam(command));
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
    about(..._multiParam(command));
  } else if (command.startsWith("mkfile")) {
    mkfile(_singleParam(command, "mkfile"));
  } else if (command.startsWith("readfile")) {
    readfile(_singleParam(command, "readfile"));
  } else if (command.startsWith("copyfile")) {
    copyfile(..._multiParam(command));
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
    size(..._multiParam(command));
  } else if (command.startsWith("rename")) {
    const params = command.split(" ");
    rename(params[1], params[2]);
  } else if (command.startsWith("time")) {
    time();
  } else if (command.startsWith("history")) {
    historyCmd(_singleParam(command, "history"));
  } else if (command.startsWith("fif")) {
    fif(..._multiParam(command));
  } else if (command.startsWith("cwd")) {
    console.log(process.cwd() + "\n");
  } else if (command.startsWith("ifnet")) {
    ifnet();
  } else if (command.startsWith("date")) {
    date();
  } else {
    // If the command didn't match any of the above, throw an unrecognized command error
    if (command !== "") {
      _errorInterpret(1, { command });
    }
  }

  if (!isEmpty) _addToHist(command);
}
