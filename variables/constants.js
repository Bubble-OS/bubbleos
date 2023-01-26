const chalk = require("chalk");

const VERSION = "0.4.0";

/**
 * Recognized commands that the shell knows.
 *
 * @deprecated As of `v0.2.3`, this constant is unused and not updated.
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
  )}, already exists. If a file with the same name already exists, delete/rename the existing file.`,
  "0x0018": `You do not have permission to create a folder in ${chalk.bold(
    "%VARIABLE%"
  )} (error message EPERM).`,
  "0x0019": `An unknown exception occurred when creating the folder: ${chalk.bold(
    "%VARIABLE%"
  )} (use %WORD_CODE% to help find what caused the error, then create a new Issue on GitHub; find the link by running 'about').`,
  "0x0020": `Please enter a file name to create. Example: ${chalk.italic("'mkfile test.txt'")}`,
  "0x0021": `The file, %VARIABLE%, already exists in the current directory. If a folder with the same name already exists, delete/rename the existing folder.`,
  "0x0022": `You do not have permission to create a file in ${chalk.bold(
    "%VARIABLE%"
  )} (error message EPERM).`,
  "0x0023": `An unknown exception occurred when creating the file: ${chalk.bold(
    "%VARIABLE%"
  )} (use %WORD_CODE% to help find what caused the error, then create a new Issue on GitHub; find the link by running 'about').`,
  "0x0024": `Please enter a file name to read. Example: ${chalk.italic(
    "'readfile windows-7-is-my-fav-os.txt'"
  )}.`,
  "0x0025": `The file, %VARIABLE%, does not exist. Verify that the file exists and try again.`,
  "0x0026": `Cannot read any files other than ones encoded in UTF-8 (plain text files).`,
  "0x0027": `You cannot view directories using ${chalk.italic("'readfile'")} (use ${chalk.italic(
    "'ls'"
  )} for that). If a file and folder name are the same, try specifing the extention to get the file contents.\nError while reading directory: ${chalk.bold(
    "%VARIABLE%"
  )} (error message EISDIR).`,
  "0x0028": `An unknown error occurred when reading the file: ${chalk.bold(
    "%VARIABLE%"
  )} (use %WORD_CODE% to help find what caused the error, then create a new Issue on GitHub; find the link by running 'about').`,
  "0x0029": `Please enter a file/folder name to remove. Example: ${chalk.italic(
    "'del never-gonna-give-you-up.txt'"
  )}.`,
  "0x0030": `The file/folder, %VARIABLE%, does not exist. Confirm that the file/folder exists, and try again.`,
  "0x0031": `The operation was cancelled by the user.`,
  "0x0032": `The file/folder, %VARIABLE%, is being used by another program. End the program and try again (error message EBUSY).`,
  "0x0033": `You do not have permission to remove the file/folder ${chalk.bold(
    "%VARIABLE%"
  )} (error message EPERM).`,
  "0x0034": `An unknown error occurred while deleting the file/folder: ${chalk.bold(
    "%VARIABLE%"
  )} (use %WORD_CODE% to help find what caused the error, then create a new Issue on GitHub; find the link by running 'about').`,
  "0x0035": `Please enter a PID for the respective task to kill. Example: ${chalk.italic(
    "'taskkill 1234'"
  )}.`,
  "0x0036": `The PID must consist of only numbers and cannot consist of letters and special characters.`,
  "0x0037": `You do not have permission to kill the process with PID ${chalk.bold(
    "%VARIABLE%"
  )} (error message EPERM).`,
  "0x0038": `An unknown error occurred while killing the process with PID: ${chalk.bold(
    "%VARIABLE%"
  )} (use %WORD_CODE% to help find what caused the error, then create a new Issue on GitHub; find the link by running 'about').`,
  "0x0039": `No text was provided to output.`,
  "0x0040": `An unknown error occurred while getting user information. This is most likely because your user does not have a username or home directory.`,
  "0x0041": `Please enter a file to count the number of words/characters in. Example: ${chalk.italic(
    "'wcount file.txt'"
  )}.`,
  "0x0042": `The file, %VARIABLE%, does not exist. Verify that the file exists and try again.`,
  "0x0043": `Cannot count words/characters in any files other than ones encoded in UTF-8 (plain text files).`,
  "0x0044": `You cannot count words/characters in directories. Error while reading directory: ${chalk.bold(
    "%VARIABLE%"
  )} (error message EISDIR).`,
  "0x0045": `An unknown error occurred while counting the words/characters in the file ${chalk.bold(
    "%VARIABLE%"
  )} (use %WORD_CODE% to help find what caused the error, then create a new Issue on GitHub; find the link by running 'about').`,
  "0x0046": `The command, ${chalk.bold(
    "%VARIABLE%"
  )}, was not found. Please try again; run ${chalk.italic(
    "'help'"
  )} standalone to see all available commands.`,
  "0x0047": `Please enter a file to show the size of it. Example: ${chalk.italic(
    "'size file.txt'"
  )}.`,
  "0x0048": `The file, %VARIABLE%, does not exist. Make sure that the file exists and try again.`,
  "0x0049": `Directories are not valid. You can only enter in a file to get the size of.`,
  "0x0050": `An unknown error occurred while getting the size of the file ${chalk.bold(
    "%VARIABLE%"
  )} (use %WORD_CODE% to help find what caused the error, then create a new Issue on GitHub; find the link by running 'about').`,
  "0x0051": `Please enter the filename and what to call the file. Example: ${chalk.italic(
    "'rename file.txt test.txt'"
  )}.`,
  "0x0052": `You cannot rename a file/folder to the same name (${chalk.bold("%VARIABLE%")}).`,
  "0x0053": `The file/folder, %VARIABLE%, does not exist. Verify that the file exists and try again.`,
  "0x0054": `You do not have permission to rename ${chalk.bold(
    "%VARIABLE%"
  )}. Verify that you have the correct permissions and try again.`,
  "0x0055": `The file/folder, ${chalk.bold(
    "%VARIABLE%"
  )}, is in use by another program. End the program and try again.`,
  "0x0056": `An unknown error occurred while renaming ${chalk.bold(
    "%VARIABLE%"
  )} (use %WORD_CODE% to help find what caused the error, then create a new Issue on GitHub; find the link by running 'about').`,
  "0x0057": `No history is available to display.`,
  "0x0058": `The number must be a whole number (not containing letters, symbols, or decimals). Received ${chalk.bold(
    "%VARIABLE%"
  )}.`,
  "0x0059": `No command was found in history point ${chalk.bold(
    "%VARIABLE%"
  )}. Try running ${chalk.italic("'history'")} to see all commands in history.`,
};

const DEFINITIONS = {
  help: {
    description: "Displays a list of available commands.",
    all: "bruh",
    usage: ["help", "help <command>"],
  },
  exit: {
    description: "Exits the BubbleOS shell.",
    all: "You can also exit the BubbleOS shell by pressing Ctrl + C, which will invoke the same function as if you were typing 'exit'.",
    usage: ["exit"],
  },
  cd: {
    description: "Changes the current working directory.",
    all: "Use absolute (C:\\Windows) or relative (..) paths. Also, you can use '--verbose' to troubleshoot an error.",
    usage: ["cd <directory>", "cd <directory> --verbose"],
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
    description: "Display information about BubbleOS.",
    all: "Display information including the version number, author, and GitHub URL.",
    usage: ["about"],
  },
  mkfile: {
    description: "Make a file in the current working directory.",
    all: "Make a new file in a specified directory. If only the file name is specified, it will create a file in the current working directory.",
    usage: ["mkfile <filename>"],
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
  cls: {
    description: "Clear the terminal screen.",
    all: "What more do you need to know? :)",
    usage: ["cls"],
  },
  print: {
    description: "Print text to screen.",
    all: "Shows whatever text you enter to the terminal output (stdout).",
    usage: ["print <text>"],
  },
  userinfo: {
    description: "Get information about the current logged-in user.",
    all: "Get the GID, home directory, shell, UID, and username of the logged-in user. Note that GID, shell and UID are not available on Windows.",
    usage: ["userinfo"],
  },
  wcount: {
    description: "Get the words and characters from a plain text file.",
    all: "Get all characters (including whitespace) and words from a plain text file.",
    usage: ["wcount <filename>"],
  },
  del: {
    description: "Remove a file or directory from the file system.",
    all: "Remove a file or directory that you specify permanently.",
    usage: ["del <filename>", "del <foldername>"],
  },
  size: {
    description: "Get the size of a file in bytes, kilobytes, megabytes, and gigabytes.",
    all: "In case a value is 0, the value shown on-screen with be 'N/A'. If a value is 0 bytes in size, all values will say 'N/A'.",
    usage: ["size <filename>"],
  },
  rename: {
    description: "Rename a file/folder to another name.",
    all: "You can also move files and folder using this command, similar to 'copyfile', but with unintended side effects.",
    usage: ["rename <beforename> <aftername>"],
  },
  time: {
    description: "Get the current time and date.",
    all: "This gets the local time and date that is on your system (NOT online).",
    usage: ["time", "date"],
  },
  date: {
    description: "Get the current time and date.",
    all: "This gets the local time and date that is on your system (NOT online).",
    usage: ["time", "date"],
  },
  history: {
    description:
      "Get the last twenty commands that you entered in a session. Also, get a specific command in history.",
    all: "Please note that once you cancel the BubbleOS session, all history is cleared. Also, after twenty commands, the oldest command is cleared.",
    usage: ["history", "history <commandNum>"],
  },
};

module.exports = {
  VERSION,
  RECOGNIZED_COMMANDS,
  ERRORS,
  DEFINITIONS,
};
