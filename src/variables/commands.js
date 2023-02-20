const about = require("../commands/about");
const bub = require("../commands/bub");
const cd = require("../commands/cd");
const cls = require("../commands/cls");
const copy = require("../commands/copy");
const date = require("../commands/date");
const del = require("../commands/del");
const execFile = require("../commands/exec");
const fif = require("../commands/fif");
const help = require("../commands/help");
const { historyCmd } = require("../commands/history");
const ifnet = require("../commands/ifnet");
const ls = require("../commands/ls");
const mkdir = require("../commands/mkdir");
const mkfile = require("../commands/mkfile");
const printText = require("../commands/print");
const readfile = require("../commands/readfile");
const rename = require("../commands/rename");
const size = require("../commands/size");
const symlink = require("../commands/symlink");
const sysinfo = require("../commands/sysinfo");
const taskkill = require("../commands/taskkill");
const time = require("../commands/time");
const tips = require("../commands/tips");
const userinfocmd = require("../commands/userinfo");
const wcount = require("../commands/wcount");

/**
 * All of the BubbleOS commands and their respective functions.
 */
const COMMANDS = {
  about,
  bub,
  cd,
  cls,
  copy,
  date,
  del,
  exec: execFile,
  fif,
  help,
  history: historyCmd,
  ifnet,
  ls,
  mkdir,
  mkfile,
  print: printText,
  readfile,
  rename,
  size,
  symlink,
  sysinfo,
  taskkill,
  time,
  tips,
  userinfo: userinfocmd,
  wcount,
};

module.exports = COMMANDS;
