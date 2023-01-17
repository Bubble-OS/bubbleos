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
];

const DEFINITIONS = {
  help: {
    description: "Displays a list of available commands.",
    usage: ["help", "help <command>"],
  },
  exit: {
    description: "Exits the BubbleOS Lite shell.",
    usage: ["exit"],
  },
  cd: {
    description: "Changes the current working directory.",
    usage: ["cd <directory>"],
  },
  sysinfo: {
    description: "Displays system information.",
    usage: ["sysinfo"],
  },
  ls: {
    description: "Displays the contents of the current working directory or other directories.",
    usage: ["ls", "ls <directory>"],
  },
  taskkill: {
    description: "Terminates a process using a PID.",
    usage: ["taskkill <PID>"],
  },
};

module.exports = {
  VERSION,
  RECOGNIZED_COMMANDS,
  DEFINITIONS,
};
