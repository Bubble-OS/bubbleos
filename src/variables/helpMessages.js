// Get variables
const { GLOBAL_NAME } = require("./constants");

/**
 * All help messages for (almost) all BubbleOS commands.
 */
const HELP = {
  about: {
    usage: "about [-l]",
    desc: `Get information about ${GLOBAL_NAME}, including the build, version, author, and links to various related websites. You can also view the license by running the command with '-l'.`,
    args: { "[-l]": `View the license of ${GLOBAL_NAME}.` },
  },
  bub: {
    usage: "bub <file> [-d] [--allow-exit]",
    desc: `Run a file which contains ${GLOBAL_NAME} commands. The file must end with '.bub'. To add comments in the file, start a line with '#'.`,
    args: {
      "<file>": "The file of which to execute commands in.",
      "[-d]":
        "Whether to display the commands that the program is currently executing from the file or not. By default, commands do not display.",
      "[--allow-exit]": `By default, ${GLOBAL_NAME} will not allow the 'exit' command to be run if it is in a '.bub' file. If this flag is passed, it will allow exiting ${GLOBAL_NAME} from the script.`,
    },
  },
  cd: {
    usage: "cd <dir> [-s]",
    desc: `Change the CWD (current working directory) into the one specified. If a symbolic link is passed, ${GLOBAL_NAME} will attempt to find where its target is, and change the CWD to that.. Note that this does not change the CWD for the system; only for ${GLOBAL_NAME}.`,
    args: {
      "<dir>":
        "The directory to change into. Both absolute and relative paths will work, as well as directory symbolic links.",
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
        "The source file/directory. The file/directory must exist, otherwise, it will throw an error.",
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
    desc: `USE WITH CAUTION! Crashes ${GLOBAL_NAME} in multiple ways, including causing a fatal error, hanging the terminal session, and also causing a memory leak. Note that with the memory leak, ${GLOBAL_NAME} will crash once it has its maximum allocated memory space.`,
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
    desc: `Gets the current date from your local system. The date will print out in a friendly format like so: "[day], the [date] of [month] [year]". The date will have the appropriate ordinal (e.g. 'st'), and the day/month will have their names. Below the friendly name in brackets is a date styled in the slash-like format.`,
    args: {},
  },
  del: {
    usage: "del <path> [-s] [-y]",
    desc: `Delete any file/directory, regardless of if it is empty or not. The command will automatically infer whether the path entered is a file or directory, and appropriately delete it. In the case of an error, ${GLOBAL_NAME} will keep trying to delete it until the maximum tries have been surpassed.`,
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
      "<file>": `The executable file path. The file can end with any extension, but note that a file may show a success message while not successfully executing.`,
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
    usage: "fif <file> [-n] [-p] [-v]",
    desc: "Show all occurrences in a file that matches the phrase entered. Note that the search is case-sensitive. It will output the number of occurrences, the character location of each occurrence, and the visual occurrences. If no arguments of these that were just listed were passed, it will by default show all of them.",
    args: {
      "<file>":
        "The file path that should be searched. Both absolute and relative paths are accepted for the filename.",
      "[-n]": "Show the number of occurrences.",
      "[-p]":
        "Show the character location/place of each starting character for each occurrence of the phrase. This is counted from the start of the file.",
      "[-v]":
        "Show the visual occurrences, which are the contents of the file with the phrase occurrences highlighted.",
    },
  },
  hash: {
    usage: "hash <file>",
    desc: `Get hashes of a file that you specify in a prompt. ${GLOBAL_NAME} currently supports the following hashes: md5, sha1, sha224, sha256, sha384, sha512, sha3-224, sha3-256, sha3-384, sha3-512, shake128 and shake256. Alternatively, you can also enter 'all' to show all available hashes.`,
    args: {
      "<file>":
        "The file to get the hashes of. Note that for large files, it may take a while to get hashes.",
    },
  },
  help: {
    usage: "help [<command>] [--rm-tip]",
    desc: `Get a list of all available ${GLOBAL_NAME} commands, or get information about a specific command such as usage, arguments, and a short description.`,
    args: {
      "[<command>]": "Get more information about a specific command.",
      "[--rm-tip]": "If you don't provide a specific command, hide the tip that comes.",
    },
  },
  history: {
    usage: "history [<numPlace>]",
    desc: "Show the last fifty commands entered in BubbleOS, regardless if they were recognized or not (empty commands are not saved). After fifty commands have been stored in the history, the oldest gets deleted. You can get a specific command by entering that history point in the command.",
    args: {
      "[<numPlace>]": "Optional; show the exact command at that history point.",
    },
  },
  ifnet: {
    usage: "ifnet [-y]",
    desc: "Get a list of all running network interfaces running on your local machine, and information about them, such as their IP/MAC address, family, netmask, and more.",
    args: {
      "[-y]": "Automatically confirm the confirmation prompt.",
    },
  },
  link: {
    usage: "link <source> [<link>] [-u] [-s] [-y]",
    desc: "Create a hard link (link) that points to the source (source). Hard links will replicate the data of the source, and will keep the data even when the source is deleted.",
    args: {
      "[-u]":
        "Unlink a file. This will actually just ultimately a file, no matter if it is a link or not.",
      "[-s]":
        "Silently link/unlink a file. This will hide all success messages, however, all error messages will still be shown.",
      "[-y]": "Automatically confirm the confirmation prompt when unlinking a file.",
    },
  },
  lock: {
    usage: "lock",
    desc: "Lock the operating system by showing the lock screen. On Linux, this requires xdg-screensaver, gnome-screensaver, cinnamon-screensaver, or dm-tool to be installed.",
    args: {},
  },
  ls: {
    usage: "ls [<dir>] [-s]",
    desc: "Get all of the files and directories in a directory. By default, the current working directory is used, but you can manually specify a directory. You can also view the contents of the directory in a shorter, row/column view.",
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
  ping: {
    usage: "ping <hostname>",
    desc: "Ping a website for a response, and output the response (e.g. 200 is OK, 404 is Not Found, 500 is Internal Server Error, etc.). Note that if an error appears for a website such as 'google.com', try prefixing it with 'www.google.com'. Also note that this command only does a HTTPS request (not a HTTP request).",
    args: {
      "<hostname>": "The host name to ping. Make sure that the URL/IP address is valid.",
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
    desc: `Read any plain text file in the terminal. Both absolute and relative paths are accepted for the file path. Note that if the number of characters in the file exceeds 5000, ${GLOBAL_NAME} will confirm that you want to read it, and if there are more than 100,000 characters, ${GLOBAL_NAME} will refuse to read the file (unless you pass a flag).`,
    args: {
      "<file>":
        "The file to read. Note that only plain text files can be read to avoid terminal corruption. Absolute and relative paths are accepted.",
      "[-y]":
        "Automatically accept the warning prompt if there are more than 5000 characters in a file.",
      "[--ignore-max]":
        "Ignore the maximum limit of characters in a file that BubbleOS can read (100,000 characters). Use this flag at your own risk!",
    },
  },
  rename: {
    usage: "rename <old> <new> [-y] [-s]",
    desc: `Rename a file from the old name to the new name. This can also be used to cut files. If the old and new file names are the same, ${GLOBAL_NAME} will not continue. Also, if the new file already exists, ${GLOBAL_NAME} will confirm that you want to overwrite the file.`,
    args: {
      "<old>":
        "The old file/directory name that should be renamed. Absolute and relative paths are both accepted.",
      "<new>":
        "The new file/directory name that it should be renamed to. Absolute and relative paths are both accepted.",
      "[-y]": "Automatically accept the confirmation prompt if the new name already exists.",
      "[-s]":
        "If this flag is passed, no success output will be shown, but error messages will still be shown.",
    },
  },
  size: {
    usage: "size <file> [-b] [-kb] [-mb] [-gb]",
    desc: "Show the size of a file in bytes, kilobytes, megabytes, and gigabytes. All sizes have four decimal places. If a size has a value of zero, it will have a 'not available' value. Also, if the file system does not support getting sizes, all values will say 'not available' (unless the file is zero bytes in size). You can also filter the sizes using arguments (listed below).",
    args: {
      "<file>":
        "The file to measure the size of. Both absolute and relative paths are accepted. Getting the size of a directory is not yet supported.",
      "[-b]": "Get only the size of the file in bytes.",
      "[-kb]": "Get only the size of the file in kilobytes.",
      "[-mb]": "Get only the size of the file in megabytes.",
      "[-gb]": "Get only the size of the file in gigabytes.",
    },
  },
  symlink: {
    usage: "symlink <target> [<path>] [-c] [-s]",
    desc: "Either create a symbolic link, or check if a path is a symbolic link. To make a symbolic link, you must pass both the target (the original path) and the path (the symbolic link). Otherwise, to check if a path is a symbolic link, only the target (path) is required to be passed, as well as the '-c' argument.",
    args: {
      "<target>":
        "The original path to which the symbolic link will point to, in the case of creating a symbolic link, else, the path to check if it is a symbolic link or not.",
      "[<path>]":
        "This path is only needed if you are creating a symbolic link. This is the path to which the symbolic link will be created in. It will automatically infer the type (in the case of Windows, either 'file' or 'directory', but never 'junction').",
      "[-c]":
        "Whether to check if a path is a symbolic link or not. If this flag is passed, it is not required to pass in the to-create path.",
      "[-s]": "Silence all success messages, and only show error messages.",
    },
  },
  sysinfo: {
    usage: "sysinfo [-c] [-s] [-a] [-e] [--all] [--rm-tip]",
    desc: `Get all system information about your local machine that ${GLOBAL_NAME} is currently running on. This includes, in summary, the operating system, release, computer name, memory usage, system uptime, environment variables and more. This can also be filtered by subheadings through arguments (listed below).`,
    args: {
      "[-c]": "Display basic computer information.",
      "[-s]": "Display system resources that are being used.",
      "[-a]": "Display advanced system information.",
      "[-e]": "Display all local environment variables.",
      "[--all]": "Display all information.",
      "[--rm-tip]": "Remove the tip that would appear if no filter arguments were passed.",
    },
  },
  taskkill: {
    usage: "taskkill <pid> [-y] [-s] [--kill-self]",
    desc: "Kill any process on your device using their respective PID (process identification number). Note that this will force-close the process, and any data that was unsaved in that process would be lost.",
    args: {
      "<pid>": "The process identification number that is to be terminated.",
      "[-y]": "Automatically accept the confirmation prompt when killing a process.",
      "[-s]": "Silence all outputs excluding the confirmation prompt and error messages.",
      "[--kill-self]": `By default, you cannot kill the ${GLOBAL_NAME} process. Using this flag, you can successfully kill it. However, this should be used at your own risk, as it is safer to use the 'exit' command instead.`,
    },
  },
  tasklist: {
    usage: "tasklist [<filter>]",
    desc: "Show all local processes that are running on the device and their respective PID. This command can be helpful to find a PID to kill in 'taskkill'. You can also optionally filter for processes if you know the name of the process.",
    args: {
      "[<filter>]": "The process name to filter for and display only.",
    },
  },
  time: {
    usage: "time [-24]",
    desc: "Get the time from your local system in twelve-hour time (by default). However, you can change this using the '-24' flag, which will change the time to twenty-four-hour time.",
    args: {
      "[-24]": "Show the time in 24-hour time instead of 12-hour time.",
    },
  },
  tips: {
    usage: "tips",
    desc: `Show tips relating to the use of ${GLOBAL_NAME}. However, another text is shown, including fun facts about ${GLOBAL_NAME} too!`,
    args: {},
  },
  userinfo: {
    usage: "userinfo",
    desc: "Show user-related system information from the local machine. This includes the UID, GID, shell, username, user directory, and temporary directory. Note that on Windows, the UID, GID, and shell are unavailable and are not shown. This command may be merged with 'sysinfo' in later versions.",
    args: {},
  },
  wcount: {
    usage: "wcount <file> [-l] [-w] [-c]",
    desc: "Get the number of words, lines and characters in a file. You can also use filter arguments to narrow the amount of details that you get. This command reads the file that you provide, however, it does not edit it in any way.",
    args: {
      "<file>":
        "The file to check the number of words, lines and characters in. Both absolute and relative paths are accepted.",
      "[-l]": "Only display the number of lines in the file.",
      "[-w]": "Only display the number of words in the file.",
      "[-c]": "Only display the number of characters in the file.",
    },
  },
};

// Export the constant (variable)
module.exports = HELP;
