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
    usage: "bub <file> [-d] [--allow-exit]",
    desc: `Run a file which contains ${GLOBAL_NAME} commands. The file must end with ${chalk.italic(
      "'.bub'"
    )}, otherwise, ${GLOBAL_NAME} will attempt to add the extention automatically. To add comments in the file, start a line with ${chalk.italic(
      "'#'"
    )}.`,
    args: {
      "<file>": "The file of which to execute commands in.",
      "[-d]":
        "Whether to display the commands that the program is currently executing from the file or not. By default, commands do not display.",
      "[--allow-exit]": `By default, ${GLOBAL_NAME} will not allow the ${chalk.italic(
        "'exit'"
      )} command to be run if it is in a ${chalk.italic(
        "'.bub'"
      )} file. If this flag is passed, it will allow exiting ${GLOBAL_NAME} from the script.`,
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
    usage: "copy <src> <dest> [-s] [-y] [-t] [--rm-symlink]",
    desc: "Copies a file/directory from the source to the destination (with its contents). Absolute and relative paths for both arguments are accepted. The destination must have the name of the copied file/directory (otherwise if the path already exists, it will be overwritten).",
    args: {
      "<src>":
        "The source file/directory. The file/directory must exist, otherwise it will throw an error.",
      "<dest>":
        "The destination file/directory with its (new) name. If the name passed already exists, it will be overwritten.",
      "[-s]":
        "Silently copy the source to the destination and silence all success messages. Only errors are outputted.",
      "[-y]":
        "If the destination exists, then automatically accept the prompt instead of confirming to overwrite the file/directory.",
      "[-t]":
        "Only for copying directories. Keeps the original timestamps of the nested files/directories. By default, this is false.",
      "[--rm-symlink]":
        "Only for copying directories. If a file/folder contained in the directory is a symbolic link, it will be replaced by the contents of the path it was pointing to. By default, this is false.",
    },
  },
  crash: {
    usage: "crash [<index>]",
    desc: `${chalk.bold(
      "USE WITH CAUTION!"
    )} Crashes ${GLOBAL_NAME} in multiple ways, including causing a fatal error, hanging the terminal session, and also causing a memory leak. Note that with the memory leak, ${GLOBAL_NAME} will crash once it has it its maximum allocated memory space.`,
    args: {
      "[<index>]": `An index which points to the crashing method. If the index does not exist, a warning will appear, and it will default to asking for a prompt.`,
    },
  },
  cwd: {
    usage: "cwd",
    desc: `Prints the current working directory that ${GLOBAL_NAME} is currently in.`,
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
    usage: "del <path> [-s] [-y]",
    desc: `Delete any file/directory, regardless of if it is empty or not. The command will automatically infer on whether the path entered is a file or directory, and appropriately delete it. In the case of an error, ${GLOBAL_NAME} will keep trying to delete it until the maximum tries have been surpassed.`,
    args: {
      "<path>":
        "The file/directory to delete. The command will work even if the directory is empty or not.",
      "[-s]":
        "Silently delete the path that the user requested. This means that the success message will not be shown, but error messages will still be outputted.",
      "[-y]": "Automatically skip the confirmation prompt. By default, this is disabled.",
    },
  },
  exec: {
    usage: "exec <file> [-s] [-h] [--sh]",
    desc: `Run an executable from ${GLOBAL_NAME}. This command works on all operating systems. ${GLOBAL_NAME} will attempt to execute all files, regardless if they are an executable or not.`,
    args: {
      "<file>": `The executable file path. The file can end with any extention, but note that a file may show a success message while not actually successfully executing.`,
      "[-s]":
        "Silently execute a file. This will silence the success message, but error messages will still be shown.",
      "[-h]":
        "Hide the subprocess console window that would normally be created on Windows systems. By default, this is disabled.",
      "[--sh]":
        "If this argument is passed, the executable will run inside of a shell. By default, this is disabled.",
    },
  },
  exit: {
    usage: "exit [-c]",
    desc: `Exits the ${GLOBAL_NAME} shell gracefully with an exit code of 0 (success). Also clears the screen if the user requested it once BubbleOS has exited.`,
    args: {
      "[-c]": `If this flag is present, ${GLOBAL_NAME} will clear the terminal once it has exited.`,
    },
  },
  fif: {
    usage: "fif <file> <phrase> [-n] [-p] [-v]",
    desc: "Show all occurrences in a file that matches the phrase passed. Both absolute and relative paths are accepted for the path. Note that the search is case-sensitive. It will output the number of occurrences, the character location of each occurrence, and the visual occurrences. If no arguments of these that were just listed were passed, it will by default show all of them.",
    args: {
      "<file>":
        "The file path that should be searched. Both absolute and relative paths are accepted for the filename.",
      "<phrase>": "The phrase to search for in the file. Note that the search is case-sensitive.",
      "[-n]": "Show the number of occurrences.",
      "[-p]":
        "Show the character location/place of each starting character for each occurrence of the phrase. This is counted from the start of the file.",
      "[-v]":
        "Show the visual occurrences, which is the contents of the file with the phrase occurrences highlighted.",
    },
  },
  help: {
    usage: "help [<command>]",
    desc: `Get a list of all available ${GLOBAL_NAME} commands, or get information about a specific command such as usage, arguments, and a short description.`,
    args: { "[<command>]": "Get more information about a specific command." },
  },
  history: {
    usage: "history [<numPlace>]",
    desc: "Show the last fifty commands entered in BubbleOS, regardless if they were recognized or not (empty commands are not saved). After fifty commands have been stored in the history, the oldest get deleted. You can get a specfic command by entering that history point in the command.",
    args: {
      "[<numPlace>]": "Optional; show the exact command at that history point.",
    },
  },
  ifnet: {
    usage: "ifnet",
    desc: "Get a list of all running network interfaces running on your local machine, and information about them, such as their IP/MAC address, family, net mask, and more.",
    args: {},
  },
  ls: {
    usage: "ls [<dir>] [-s]",
    desc: "Get all of the files and directories in a directory. By default, the current working directory is used, but you can manually specify a directory. You can also view the contents of the directory in a shorter, rows/colums view.",
    args: {
      "[<dir>]": `Optionally specify a directory to view the contents of. By default, if this is not specified, ${GLOBAL_NAME} will use the current working directory.`,
      "[-s]": "View directory contents in a shorter view in three rows.",
    },
  },
  mkdir: {
    usage: "mkdir <dir> [-s]",
    desc: "Make a directory (or directories, if the parent does not exist). Both relative and absolute paths are accepted. Note that you cannot make a directory if it is longer than the size of a path that is allowed. Also, invalid characters aren't allowed to be used.",
    args: {
      "<dir>": `The directory to create. If the parent directories passed do not exist, ${GLOBAL_NAME} will create those too.`,
      "[-s]":
        "If this flag is passed, no success output will be shown, but error messages will still appear.",
    },
  },
  mkfile: {
    usage: "mkfile <file> [-s]",
    desc: "Make a file. Both relative and absolute paths are accepted. Note that you cannot make a file if it is longer than the size of a path that is allowed. Also, invalid characters aren't allowed to be used.",
    args: {
      "<file>": `The file to create. If the parent directories passed do not exist, ${GLOBAL_NAME} will throw an error.`,
      "[-s]":
        "If this flag is passed, no success output will be shown, but error messages will still appear.",
    },
  },
  print: {
    usage: "print <text>",
    desc: `Print any text to the standard output. Note that if no text is provided, ${GLOBAL_NAME} will throw an error.`,
    args: {
      "<text>": "The text to output to the standard output.",
    },
  },
  readfile: {
    usage: "readfile <file> [-y] [--ignore-max]",
    desc: `Read any plain text file in the terminal. Both absolute and relative paths are accepted for the file path. Note that if the number of characters in the file exceed 5000, ${GLOBAL_NAME} will confirm that you want to read it, and if there are more than 100,000 characters, ${GLOBAL_NAME} will refuse to read the file (unless you pass a flag).`,
    args: {
      "<file>":
        "The file to read. Note that only plain text files can be read to avoid terminal corruption. Absolute and relative paths are accepted.",
      "[-y]":
        "Automatically accept the warning prompt if there are more than 5000 characters in a file.",
      "[--ignore-max]":
        "Ignore the maxmimum limit of characters in a file that BubbleOS can read (100,000 characters). Use this flag at your own risk!",
    },
  },
};

module.exports = HELP;
