const VERSION = "0.2.2";

const RECOGNIZED_COMMANDS = [
  "help",
  "exit",
  "cd",
  "sysinfo",
  "ls",
  "taskkill",
  "mkdir",
  "exec",
  "about",
  "rmdir",
  "mkfile",
  "rmfile",
  "readfile",
  "copyfile",
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
    all: "Color-codes the contents of the CWD or another directory that you specify and shows it on-screen. Note: To view files, use the 'readfile' command.",
    usage: ["ls", "ls <directory>"],
  },
  taskkill: {
    description: "Terminates a process using a PID.",
    all: "Note: You cannot use the process name; only the PID works. This has NOT been tested on Mac/Linux.",
    usage: ["taskkill <PID>"],
  },
  mkdir: {
    description: "Make a directory in the file system.",
    all: "Make a directory using an absolute or a relative path. For Windows users: uses UNC paths (\\\\?\\).",
    usage: ["mkdir <foldername>"],
  },
  exec: {
    description: "Execute 'exe' files. Windows users only.",
    all: "Execute executable files for Windows users. Programs that must be run as admin must have Bubble run as an administrator. You do not need to specify '.exe' at the end.",
    usage: ["exec <execfile>"],
  },
  about: {
    description: "Display information about BubbleOS Lite.",
    all: "Display information including the version number, author, and GitHub URL.",
    usage: ["about"],
  },
  rmdir: {
    description: "Remove a directory from the file system.",
    all: "Remove a directory using an absolute or relative path. For Windows users: uses UNC paths (\\\\?\\).",
    usage: ["rmdir <foldername>"],
  },
  mkfile: {
    description: "Make a file in the current working directory.",
    all: "Make a new file in a specified directory. If only the file name is specified, it will create a file in the current working directory.",
    usage: ["mkfile <filename>"],
  },
  rmfile: {
    description: "Remove a file from the file system.",
    all: "Remove a file in the specified directory, either absolute or relative.",
    usage: ["rmfile <filename>"],
  },
  readfile: {
    description: "Read a file's contents.",
    all: "Read a specified file's contents and output it to the terminal. Only UTF-8 encodings are supported. WARNING: Viewing non-plain text files can temporarily corrupt your terminal.",
    usage: ["readfile <filename>"],
  },
  copyfile: {
    description: "Copy a file from the source to a destination.",
    all: "Copies a file from a location to another, overwriting it if it exists in the destination folder. THIS COMMAND IS VERY UNSTABLE RIGHT NOW.",
    usage: ["copyfile <filename>"],
  },
};

module.exports = {
  VERSION,
  RECOGNIZED_COMMANDS,
  DEFINITIONS,
};
