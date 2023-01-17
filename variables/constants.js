const VERSION = "0.1.0";

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
    example: ["help taskkill"],
  },
  exit: {
    description: "Exits the BubbleOS Lite shell.",
    usage: ["exit"],
    example: ["exit"],
  },
  cd: {
    description: "Changes the current working directory.",
    usage: ["cd <directory>"],
    example: ["cd Windows"],
  },
};

module.exports = {
  VERSION,
  RECOGNIZED_COMMANDS,
  DEFINITIONS,
};
