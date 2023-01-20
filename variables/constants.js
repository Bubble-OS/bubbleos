const chalk = require("chalk");

const VERSION = "0.2.4";

/**
 * Recognized commands that the shell knows.
 *
 * @deprecated As of `v0.2.3`, this constant is unused.
 */
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

const ERRORS = {
  "0x0000": `Please enter a command. Type ${chalk.italic(
    "'help'"
  )} for a list of available commands.`,
  "0x0001": `The command '${chalk.bold("%VARIABLE%")}' is unrecognized. Type ${chalk.italic(
    "'help'"
  )} for a list of available commands.`,
  "0x0002": `The directory is blank. Please pass a directory like so: ${chalk.italic("'cd test'")}`,
  "0x0003": `The directory, '${chalk.bold("%VARIABLE%")}', does not exist (error message ENOENT).`,
  "0x0004": `You do not have permission to change into the directory '${chalk.bold(
    "%VARIABLE%"
  )}' (error message EPERM).`,
  "0x0005": `An unknown error occured while changing into the directory '${chalk.bold(
    "%VARIABLE%"
  )}' (use %WORD_CODE% to help find what caused the error, then create a new Issue on GitHub; find the link by running 'about').`,
  "0x0006": `The source and/or destination is/are not provided. Please provide the files, like so: ${chalk.italic(
    "'copyfile test.txt D:\\test.txt'"
  )}`,
  "0x0007": `The operation was cancelled by the user.`,
  "0x0008": `You do not have permission to copy the source file to the destination: '${chalk.bold(
    "%VARIABLE%"
  )}'. Make sure you have the correct permissions and try again. (error message EPERM).`,
  "0x0009": `Either the source or destination folder, '${chalk.bold(
    "%VARIABLE%"
  )}', do not exist. Make sure that they exist and are readable/writable and try again. (error message ENOENT).`,
  "0x0010": `An unknown error occured while copying into '${chalk.bold(
    "%VARIABLE%"
  )}' (use %WORD_CODE% to help find what caused the error, then create a new Issue on GitHub; find the link by running 'about').`,
  "0x0011": `Please enter a file name to execute. Example: ${chalk.italic("'exec explorer'")}`,
  "0x0012": `This command only works on the Windows operating system (as it is the only one which supports ${chalk.italic(
    "'exe'"
  )} files).`,
  "0x0013": `The file, ${chalk.bold(
    "%VARIABLE%"
  )}, does not exist. Verify the file name and try again.`,
  "0x0014": `The execution failed for an unknown reason (if you want, create a new Issue on GitHub by finding the link by running 'about').`,
  "0x0015": `The folder, ${chalk.bold("%VARIABLE%")}, does not exist (error message ENOENT).`,
  "0x0016": `Please enter a folder name to create. Example: ${chalk.italic("'mkdir test'")}`,
  "0x0017": `The folder, ${chalk.bold(
    "%VARIABLE%"
  )}, already exists. Please choose another directory name or delete the existing directory using ${chalk.italic(
    "'rmdir'"
  )}.`,
  "0x0018": `You do not have permission to create a folder in ${chalk.bold(
    "%VARIABLE%"
  )} (error message EPERM).`,
  "0x0019": `An unknown exception occurred when creating the folder: ${chalk.bold(
    "%VARIABLE%"
  )} (use %WORD_CODE% to help find what caused the error, then create a new Issue on GitHub; find the link by running 'about').`,
  // "0x0006": `Cannot read any files other than ones encoded in UTF-8.`,
};

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
  ERRORS,
  DEFINITIONS,
};
