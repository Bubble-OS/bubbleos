# BubbleOS Lite

BubbleOS Lite is a command-line interface of the BubbleOS PowerPoint concept!

Please note that this is not an operating system, but a shell (i.e. like WSL<sup>*B</sup>, Windows Subsystem for Linux<sup>*Bubble</sup>).

## Install

There is no installer, but just an executable. You can also download the zip file and add the `index.js` to your PATH.

### Executable

For the portable executable, go the the [Releases](https://github.com/arnavthorat78/bubbleos-lite/releases) page and download the file for your respective operating system (Windows, macOS, Linux).

Run the executable and it should open in a terminal-like window. You can also run this through command prompt (Windows), or the terminal (Mac/Linux), or other command prompt-like apps (e.g. PowerShell).

### `PATH` Installer <sup>(*Recommended for advanced users only)</sup>

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
