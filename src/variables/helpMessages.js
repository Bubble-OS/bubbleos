const { GLOBAL_NAME } = require("./aboutConsts");

const HELP_DEFINITIONS = {
  help: {
    description: `Displays a list of available commands.`,
    all: `bruh`,
    usage: [`help`, `help <command>`],
  },
  exit: {
    description: `Exits the ${GLOBAL_NAME} shell.`,
    all: `You can also exit the ${GLOBAL_NAME} shell by pressing Ctrl + C, which will invoke the same function as if you were typing 'exit'.`,
    usage: [`exit`],
  },
  cd: {
    description: `Changes the current working directory.`,
    all: `Use absolute (C:\\Windows) or relative (..) paths. Also, you can use '--verbose' to troubleshoot an error.`,
    usage: [`cd <directory>`, `cd <directory> --verbose`],
  },
  sysinfo: {
    description: `Displays system information.`,
    all: `To display advanced system information (e.g. Environment Variables), run sysinfo with the '-a' flag.`,
    usage: [`sysinfo`],
  },
  ls: {
    description: `Displays the contents of the current working directory or other directories.`,
    all: `Color-codes the contents of the CWD or another directory that you specify and shows it on-screen. Note: To view files, use the 'readfile' command.`,
    usage: [`ls [-s]`, `ls <directory> [-s]`],
  },
  taskkill: {
    description: `Terminates a process using a PID.`,
    all: `Note: You cannot use the process name; only the PID works. This has NOT been tested on Mac/Linux.`,
    usage: [`taskkill <PID>`],
  },
  mkdir: {
    description: `Make a directory in the file system.`,
    all: `Make a directory using an absolute or a relative path. For Windows users: uses UNC paths (\\\\?\\).`,
    usage: [`mkdir <foldername>`],
  },
  exec: {
    description: `Execute 'exe' files. Windows users only.`,
    all: `Execute executable files for Windows users. Programs that must be run as admin must have Bubble run as an administrator. You do not need to specify '.exe' at the end.`,
    usage: [`exec <execfile>`],
  },
  about: {
    description: `Display information about ${GLOBAL_NAME}.`,
    all: `Display information including the version number, author, and GitHub URL.`,
    usage: [`about`],
  },
  mkfile: {
    description: `Make a file in the current working directory.`,
    all: `Make a new file in a specified directory. If only the file name is specified, it will create a file in the current working directory.`,
    usage: [`mkfile <filename>`],
  },
  readfile: {
    description: `Read a file's contents.`,
    all: `Read a specified file's contents and output it to the terminal. Only UTF-8 encodings are supported. WARNING: Viewing non-plain text files can temporarily corrupt your terminal.`,
    usage: [`readfile <filename>`],
  },
  copyfile: {
    description: `Copy a file from the source to a destination.`,
    all: `Copies a file from a location to another, overwriting it if it exists in the destination folder. THIS COMMAND IS VERY UNSTABLE RIGHT NOW.`,
    usage: [`copyfile <filename>`],
  },
  cls: {
    description: `Clear the terminal screen.`,
    all: `What more do you need to know? :)`,
    usage: [`cls`],
  },
  print: {
    description: `Print text to screen.`,
    all: `Shows whatever text you enter to the terminal output (stdout).`,
    usage: [`print <text>`],
  },
  userinfo: {
    description: `Get information about the current logged-in user.`,
    all: `Get the GID, home directory, shell, UID, and username of the logged-in user. Note that GID, shell and UID are not available on Windows.`,
    usage: [`userinfo`],
  },
  wcount: {
    description: `Get the words and characters from a plain text file.`,
    all: `Get all characters (including whitespace) and words from a plain text file.`,
    usage: [`wcount <filename>`],
  },
  del: {
    description: `Remove a file or directory from the file system.`,
    all: `Remove a file or directory that you specify permanently.`,
    usage: [`del <filename>`, `del <foldername>`],
  },
  size: {
    description: `Get the size of a file in bytes, kilobytes, megabytes, and gigabytes.`,
    all: `In case a value is 0, the value shown on-screen with be 'N/A'. You can also get specific sizes by using '--size=' and then listing sizes like 'mb' for megabytes, making sure they are comma-seperated.`,
    usage: [`size <filename>`, `size <filename> --size=[b | kb | mb | gb]`],
  },
  rename: {
    description: `Rename a file/folder to another name.`,
    all: `You can also move files and folder using this command, similar to 'copyfile', but with unintended side effects.`,
    usage: [`rename <beforename> <aftername>`],
  },
  time: {
    description: `Get the current time.`,
    all: `This gets the local time that is on your system (NOT online).`,
    usage: [`time`],
  },
  date: {
    description: `Get the current date.`,
    all: `This gets the local date that is on your system (NOT online).`,
    usage: [`date`],
  },
  history: {
    description: `Get the last fifty commands that you entered in a session. Also, get a specific command in history.`,
    all: `Please note that once you cancel the ${GLOBAL_NAME} session, all history is cleared. Also, after twenty commands, the oldest command is cleared.`,
    usage: [`history`, `history <commandNum>`],
  },
  fif: {
    description: `Find a word or phrase in a file.`,
    all: `Get the number of occurrences a word/phrase has in a specified file.`,
    usage: [`fif <filename> <phrase>`],
  },
  cwd: {
    description: `Get the current working directory.`,
    all: `Get the current working directory that BubbleOS is currently in.`,
    usage: [`cwd`],
  },
  ifnet: {
    description: `Get all available network interfaces on your computer.`,
    all: `Get information such as the IP/MAC addresses, net masks, and more for all network interfaces on your computer.`,
    usage: [`ifnet`],
  },
  bub: {
    description: `Execute BubbleOS commands in a file.`,
    all: `Read commands in a '.bub' file, and execute them synchronously.`,
    usage: [`bub <filename>`],
  },
};

module.exports = HELP_DEFINITIONS;
