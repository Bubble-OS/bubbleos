// Get modules
const chalk = require("chalk");
const { keyInPause } = require("readline-sync");

// Get variables
const { GLOBAL_NAME } = require("./constants");

// Get all commands
const about = require("../commands/about");
const bub = require("../commands/bub");
const cd = require("../commands/cd");
const cls = require("../commands/cls");
const copy = require("../commands/copy");
const crash = require("../commands/crash");
const date = require("../commands/date");
const del = require("../commands/del");
const exec = require("../commands/exec");
const exit = require("../commands/exit.js");
const fif = require("../commands/fif");
const help = require("../commands/help");
const { historyCmd } = require("../commands/history");
const ifnet = require("../commands/ifnet");
const ls = require("../commands/ls");
const mkdir = require("../commands/mkdir");
const mkfile = require("../commands/mkfile");
const ping = require("../commands/ping");
const print = require("../commands/print");
const readfile = require("../commands/readfile");
const rename = require("../commands/rename");
const size = require("../commands/size");
const symlink = require("../commands/symlink");
const sysinfo = require("../commands/sysinfo");
const taskkill = require("../commands/taskkill");
const tasklist = require("../commands/tasklist");
const time = require("../commands/time");
const tips = require("../commands/tips");
const userinfo = require("../commands/userinfo");
const wcount = require("../commands/wcount");

// Easter egg :D
const cConCon = () => {
  console.log(`${chalk.bgGray.blue(` ${GLOBAL_NAME} `)}\n`);
  console.log(
    chalk.blueBright(
      "A fatal exception OE has occurred at 0028:C0034B03 in VXD VFAT(01) + 0000A3D7. The current application will be terminated.\n"
    )
  );
  console.log(chalk.blueBright(`*  Press any key to terminate ${GLOBAL_NAME}.`));
  console.log(chalk.blueBright(`*  Press CTRL+ALT+DEL to terminate your PC.\n`));
  keyInPause(chalk.blueBright(`Press any key to continue ${chalk.bold.grey("_")}`), {
    guide: false,
  });

  console.log();
  process.exit(1);
};

/**
 * All of the BubbleOS commands and their respective functions.
 */
const COMMANDS = {
  about,
  bub,
  "C:\\con\\con": cConCon,
  cd,
  cls,
  copy,
  crash,
  cwd: () => {
    console.log(process.cwd() + "\n");
  },
  date,
  del,
  erik: () => {
    console.log("Never run 'ifnet' (unless you're by yourself)!\n");
  },
  exec,
  exit,
  fif,
  help,
  history: historyCmd,
  ifnet,
  ls,
  mkdir,
  mkfile,
  ping,
  print,
  readfile,
  rename,
  size,
  symlink,
  sysinfo,
  taskkill,
  tasklist,
  time,
  tips,
  userinfo,
  wcount,
};

// Export the constant (variable)
module.exports = COMMANDS;
