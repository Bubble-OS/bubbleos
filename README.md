# BubbleOS

BubbleOS is a shell for your current operating system!

Please note that this is not an operating system, but a shell.

## Install

There is no installer, but just an executable. You can also download the zip file and add the `index.js` to your PATH.

### Executable

For the portable executable, go the the [Releases](https://github.com/Bubble-OS/bubbleos/releases) page and download the file for your respective operating system (Windows, macOS, Linux).

Run the executable and it should open in a terminal-like window. You can also run this through command prompt (Windows), or the terminal (Mac/Linux), or other command prompt-like apps (e.g. PowerShell).

### `PATH` Installer <sup>(\*Recommended for advanced users only)</sup>

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

### Commands

To get all of the commands in Bubble straight away, run `help`. Run `help <command>` to get more information about a specific command.

#### `about`

Get information about BubbleOS.
