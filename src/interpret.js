import _errorInterpret from "./functions/errorInt.js";
import _singleParam from "./functions/singleParam.js";
import _multiParam from "./functions/multiParam.js";

import help from "./help.js";
import exitBubble from "./exit.js";
import cd from "./commands/cd.js";
import ls from "./commands/ls.js";
import sysinfo from "./commands/sysinfo.js";
import taskkill from "./commands/taskkill.js";
import mkdir from "./commands/mkdir.js";
import execFile from "./commands/exec.js";
import about from "./commands/about.js";
import mkfile from "./commands/mkfile.js";
import readfile from "./commands/readfile.js";
import copyfile from "./commands/copyfile.js";
import printText from "./commands/print.js";
import userinfocmd from "./commands/userinfo.js";
import wcount from "./commands/wcount.js";
import del from "./commands/del.js";
import size from "./commands/size.js";
import rename from "./commands/rename.js";
import time from "./commands/time.js";
import date from "./commands/date.js";
import { _addToHist, historyCmd } from "./commands/history.js";
import fif from "./commands/fif.js";
import ifnet from "./commands/ifnet.js";
import bub from "./commands/bub.js";

const intCmds = (command, isEmpty) => {
  if (isEmpty) _errorInterpret(0);

  if (command.startsWith("exit")) {
    // If the user typed in 'exit'
    exitBubble(0);
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
  } else if (command.startsWith("bub")) {
    bub(..._multiParam(command));
  } else {
    // If the command didn't match any of the above, throw an unrecognized command error
    if (!isEmpty) {
      _errorInterpret(1, { command });
    }
  }

  if (!isEmpty) _addToHist(command);
};

export default intCmds;
