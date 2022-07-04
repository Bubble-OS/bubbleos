const VERSION = "0.1.0";

const RECOGNIZED_COMMANDS = ["help", "exit", "cd", "sysinfo", "ls"];

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
};

module.exports = {
  VERSION,
  RECOGNIZED_COMMANDS,
  DEFINITIONS,
};
