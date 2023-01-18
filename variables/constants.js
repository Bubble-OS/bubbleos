const VERSION = "0.1.5";

const RECOGNIZED_COMMANDS = [
  "help",
  "exit",
  "cd",
  "sysinfo",
  "ls",
  "taskkill",
  "mkfile",
  "mkdir",
  "exec",
  "about",
];

const DEFINITIONS = {
  help: {
    description: "Displays a list of available commands.",
    all: "bruh",
    usage: ["help", "help <command>"],
  },
  exit: {
    description: "Exits the BubbleOS Lite shell.",
    all: "You can also exit the BubbleOS shell by pressing Ctrl + C, which will invoke the same function as if you were typing 'exit'.",
    usage: ["exit"],
  },
  cd: {
    description: "Changes the current working directory.",
    all: "Change into another directory using absolute (e.g. C:\\Windows) or relative (e.g. '..') paths, changing the current working directory.",
    usage: ["cd <directory>"],
  },
  sysinfo: {
    description: "Displays system information.",
    all: "To display advanced system information (e.g. Environment Variables), run sysinfo with the '-a' flag.",
    usage: ["sysinfo"],
  },
  ls: {
    description: "Displays the contents of the current working directory or other directories.",
    all: "Color-codes the contents of the CWD or another directory that you specify and shows it on-screen.",
    usage: ["ls", "ls <directory>"],
  },
  taskkill: {
    description: "Terminates a process using a PID.",
    all: "Note: You cannot use the process name; only the PID works. This has NOT been tested on Mac/Linux.",
    usage: ["taskkill <PID>"],
  },
};

module.exports = {
  VERSION,
  RECOGNIZED_COMMANDS,
  DEFINITIONS,
};
