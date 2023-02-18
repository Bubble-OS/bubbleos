const _singleParam = require("./functions/singleParam");
const _multiParam = require("./functions/multiParam");

const Errors = require("./classes/Errors");

const help = require("./help");
const cd = require("./commands/cd");
const ls = require("./commands/ls");
const sysinfo = require("./commands/sysinfo");
const taskkill = require("./commands/taskkill");
const mkdir = require("./commands/mkdir");
const execFile = require("./commands/exec");
const about = require("./commands/about");
const mkfile = require("./commands/mkfile");
const readfile = require("./commands/readfile");
const copyfile = require("./commands/copyfile");
const printText = require("./commands/print");
const userinfocmd = require("./commands/userinfo");
const wcount = require("./commands/wcount");
const del = require("./commands/del");
const size = require("./commands/size");
const rename = require("./commands/rename");
const time = require("./commands/time");
const date = require("./commands/date");
const { _addToHist, historyCmd } = require("./commands/history");
const fif = require("./commands/fif");
const ifnet = require("./commands/ifnet");
const bub = require("./commands/bub");
const tips = require("./commands/tips");
const symlink = require("./commands/symlink");
const copydir = require("./commands/copydir");
const cls = require("./commands/cls");

/**
 * Interpret all available BubbleOS commands.
 *
 * @param {string} command The command that was requested to be interpretted by the user.
 */
const intCmds = (command) => {
  const isEmpty = command.length === 0;

  if (isEmpty) Errors.enterCommand();

  if (command.startsWith("exit")) {
    // If the user typed in 'exit'
    require("./exit");
  } else if (command.startsWith("help")) {
    help(_singleParam(command, "help"));
  } else if (command.startsWith("cd")) {
    cd(..._multiParam(command));
  } else if (command.startsWith("ls")) {
    ls(..._multiParam(command));
  } else if (command.startsWith("sysinfo")) {
    sysinfo(..._multiParam(command));
  } else if (command.startsWith("taskkill")) {
    taskkill(_singleParam(command, "taskkill"));
  } else if (command.startsWith("cls")) {
    cls();
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
    del(..._multiParam(command));
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
    bub(intCmds, ..._multiParam(command));
  } else if (command.startsWith("tips")) {
    tips();
  } else if (command.startsWith("symlink")) {
    symlink(..._multiParam(command));
  } else if (command.startsWith("copydir")) {
    copydir(..._multiParam(command));
  } else {
    // If the command didn't match any of the above, throw an unrecognized command error
    if (!isEmpty) Errors.unrecognizedCommand(command);
  }

  if (!isEmpty) _addToHist(command);
};

module.exports = intCmds;
