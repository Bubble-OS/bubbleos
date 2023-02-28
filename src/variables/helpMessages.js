const { GLOBAL_NAME } = require("./constants");

const chalk = require("chalk");

const HELP = {
  about: {
    usage: "about [-l]",
    desc: `Get information about ${GLOBAL_NAME}, including the build, version, author, and links to various related websites. You can also view the license by running the command with ${chalk.italic(
      "'-l'"
    )}.`,
    args: { "[-l]": `View the license of ${GLOBAL_NAME}.` },
  },
  bub: {
    usage: "bub <file> [-d]",
    desc: `Run a file which contains ${GLOBAL_NAME} commands. The file must end with ${chalk.italic(
      "'.bub'"
    )}, otherwise, ${GLOBAL_NAME} will attempt to add the extention automatically. To add comments in the file, start a line with ${chalk.italic(
      "'#'"
    )}.`,
    args: {
      "<file>": "The file of which to execute commands in.",
      "[-d]":
        "Whether to display the commands that the program is currently executing from the file or not. By default, commands do not display.",
    },
  },
  cd: {
    usage: "cd <dir> [-s]",
    desc: `Change the CWD (current working directory) into the one specified. Absolute and relative paths are both accepted. Note that this does not change the CWD for the system; only for ${GLOBAL_NAME}.`,
    args: {
      "<dir>": "The directory to change into. Both absolute and relative paths will work.",
      "[-s]":
        "Silence output to the standard output. Only error messages will display. By default, this option is disabled.",
    },
  },
  cls: {
    usage: "cls",
    desc: `Clears the entire terminal screen. This does not delete the history of commands entered, nor does it restart/end ${GLOBAL_NAME}.`,
    args: {},
  },
  copy: {
    usage: "copy <src> <dest> [-t] [--rm-symlink]",
    desc: "Copies a file/directory from the source to the destination (with its contents). Absolute and relative paths for both arguments are accepted. The destination must have the name of the copied file/directory (otherwise if the path already exists, it will be overwritten).",
    args: {
      "<src>":
        "The source file/directory. The file/directory must exist, otherwise it will throw an error.",
      "<dest>":
        "The destination file/directory with its (new) name. If the name passed already exists, it will be overwritten.",
      "[-t]":
        "Only for copying directories. Keeps the original timestamps of the nested files/directories. By default, this is false.",
      "[--rm-symlink]":
        "Only for copying directories. If a file/folder contained in the directory is a symbolic link, it will be replaced by the contents of the path it was pointing to. By default, this is false.",
    },
  },
  crash: {
    usage: "crash",
    desc: `${chalk.bold(
      "USE WITH CAUTION!"
    )} Crashes ${GLOBAL_NAME} in multiple ways, including causing a fatal error, hanging the terminal session, and also causing a memory leak. Note that with the memory leak, ${GLOBAL_NAME} will crash once it has it its maximum allocated memory space.`,
    args: {},
  },
  date: {
    usage: "date",
    desc: `Gets the current date from your local system. The date will print out in a friendly format like so: ${chalk.italic(
      "[day], the [date] of [month] [year]"
    )}. The date will have the appropriate suffix (e.g. ${chalk.italic(
      "'st'"
    )}), and the day/month will have their names. Below the friendly name in brackets is a date styled in the slash-like format.`,
    args: {},
  },
  del: {
    usage: "del <path> [-y]",
    desc: `Delete any file/directory, regardless of if it is empty or not. The command will automatically infer on whether the path entered is a file or directory, and appropriately delete it. In the case of an error, ${GLOBAL_NAME} will keep trying to delete it until the maximum tries have been surpassed.`,
    args: {
      "<path>":
        "The file/directory to delete. The command will work even if the directory is empty or not.",
      "[-y]": "Automatically skip the confirmation prompt. By default, this is disabled.",
    },
  },
  help: {
    usage: "help [command]",
    desc: `Get a list of all available ${GLOBAL_NAME} commands, or get information about a specific command such as usage, arguments, and a short description.`,
    args: { "[command]": "Get more information about a specific command." },
  },
};

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
    usage: [`about [-l]`],
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
    usage: [`del <name> [-y]`],
  },
  size: {
    description: `Get the size of a file in bytes, kilobytes, megabytes, and gigabytes.`,
    all: `In case a value is 0, the value shown on-screen with be 'N/A'. You can also get specific sizes by using '--size=' and then listing sizes like 'mb' for megabytes, making sure they are comma-seperated.`,
    usage: [`size <filename>`, `size <filename> --size=[b | kb | mb | gb]`],
  },
  rename: {
    description: `Rename a file/folder to another name.`,
    all: `You can also move files and folder using this command, similar to 'copy', but with unintended side effects.`,
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
    usage: [`bub <filename> [-d]`],
  },
  symlink: {
    description: `Creates a symbolic link, or checks if a path is a symbolic link.`,
    all: `To check if a path is a symbolic link, add ${chalk.italic(
      "'-c'"
    )} to the end. Also, you may have to run ${GLOBAL_NAME} as admin to create a symbolic link.`,
    usage: [`symlink <target> <path>`, `symlink <path> -c`],
  },
  tips: {
    description: `Get randomized tips about ${GLOBAL_NAME}.`,
    all: `If there are no more tips available, then a warning will show.`,
    usage: [`tips`],
  },
};

module.exports = HELP;
