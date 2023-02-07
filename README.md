# BubbleOS

BubbleOS is a shell for your current operating system!

Please note that this is not an operating system, but a shell.

## Table of Contents

1. [Installation](#installation)
    1. [Executable](#executable)
    2. [`PATH` Installer](#path-installer)
        1. [`EXE` File](#exe-file)
            1. [Windows](#windows)
            2. [macOS/Linux](#macoslinux)
        2. [`ZIP` File](#zip-file)
3. [Using Bubble](#using-bubble)
    1. [Commands](#commands)
        1. [`about`](#about)
        2. [`cd`](#cd)

## Installation

There is no installer, but just a portable executable. You can also download the `zip` file and add the `index.js` to your `PATH`.

### Executable

For the portable executable, go the the [Releases](https://github.com/Bubble-OS/bubbleos/releases) page and download the file for your respective operating system (Windows, macOS, Linux).

Runing the executable should open it in a terminal-like window. You can also run this through command prompt (Windows), or the terminal (Mac/Linux), or other command prompt-like apps (e.g. PowerShell).

### `PATH` Installer

**Recommended for advanced users only!**

#### `EXE` File

If you want to add `bubble` to your path, first install the executable from the [Releases](https://github.com/Bubble-OS/bubbleos/releases).

##### Windows

In Windows, follow the steps below.

1.  Move the Bubble executable to a place where you won't delete it (e.g. `C:\Windows`).
2.  Press <kbd>Windows</kbd> + <kbd>R</kbd>, and type `sysdm.cpl`. Press <kbd>Enter</kbd>.
3.  Go to the _Advanced_ tab, and then click _Environment Variables_.
4.  If you want to add it for your user only, click _New_ under user variables, else, click _New_ under system variables.
5.  Click _New_ and add the path to the Bubble executable.
6.  Close all of the windows by clicking _Ok_. It should work now anywhere in the command prompt now!

##### macOS/Linux

_Steps coming soon..._

#### `ZIP` File

To add BubbleOS to your path, you can just install the latest version of Node.js from [this website](https://nodejs.org/en/). To see if you have it installed or not, run the following command:

```
$ node -v
```

If it returns an error, you don't have it installed. Otherwise, it is installed.

Once that is done, you need to extract the `zip` contents and run the following command in the root directory:

```
$ npm install
```

**LINUX ONLY!** Run the following command in the root to make the file executable.

```
$ chmod +x index.js
```

**All OSes:** Now run the following command in the root directory:

```
$ npm link
```

Now, you can run BubbleOS anywhere from the command prompt/terminal by just typing in `bubble`.

## Using Bubble

If you have downloaded the executable, just run the file like usual. If you have downloaded the source code and already followed the above steps, run `bubble` in your command interpreter/terminal.

## Commands

To get all of the commands in Bubble straight away, run `help`. Run `help <command>` to get more information about a specific command.

A `FATAL ERROR` occurs when there is an unknown/unhandled exception in the code. In these circumstances, you can run the command that caused the error with the `--verbose` flag.

### `about`

Get information about BubbleOS, such as the version number, build number, author name, and links to various websites relating to the author.

### `cd`

Change into another directory on your local machine. You can do this by running `cd <directory>`. This will automatically change the path that Bubble is in and update the [current working directory](https://en.wikipedia.org/wiki/Working_directory) automatically.

Should any issues arise using the `cd` command, you can run it with the `--verbose` flag after the directory (so, like `cd <directory> --verbose`) to see detailed information about what happens, if there is an error, for example.

The possible error codes are:

- `[2]` - The `directory` has not been passed (is `undefined`).
- `[3]` - The `directory` does not exist (`ENOENT`).
- `[4]` - The `directory` is not readable (`EPERM`).
