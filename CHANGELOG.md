# BubbleOS Changelog

This is the official BubbleOS changelog! All features will be recorded in _'groups'_, and the latest version of that _'group'_ will have an executable and a release paired with them.

## Build 131 to 1?? (v1.3.1-beta to v1.?.?-beta)

### Added Features

- Commands now have "hard aliases", which means typing in an alias will automatically run it instead of failing (e.g. `dir` runs the `ls` command). More will be added in future versions.

### Changed/Fixed Features

- Fixed an issue where running the `fif` command would crash BubbleOS.
- Updated heading color in the `fif` command to easily differentiate it.
- Changed the version text when running `-v` on the Bubble executable.
- When a fatal error completes, the user will be prompted to press the Enter key so that they can read the error.
- Changed key required to be pressed in the startup error from any key to just the Enter key, due to a previous unfixable bug.
- It is now less likely to get an unformatted error rather than a fatal error.

### Removed Features

- Removed some Easter eggs and references to Erik and B-Kernel due to less involvement in the project (but they will always be remembered ❤️).

## Build 125 to 131 (v1.2.5-beta to v1.3.1-beta)

### Added Features

- Added the `dirtree` command, which visually shows a directory tree of the folder specified and the files inside.
- The `ping` command will now follow redirects up to five times (after which it will fail with an error due to too many redirects).

### Changed/Fixed Features

- Updated the fatal error screen text and other related processes (e.g. the heap snapshot is no longer saved upon crashing).
- Fixed an issue where BubbleOS would report Windows 11 devices as Windows 10 in `sysinfo` ([#7](https://github.com/Bubble-OS/bubbleos/issues/7)).
- The `print` command no longer outputs an error message when entering nothing, it just shows nothing.
- Fixed multiple issues in the `ping` command, making it work more consistently.
- Internally improved the code of `ifnet`.
- Moved HTTP codes and messages to a separate JSON file internally.

### Removed Features

- Internally removed unused code in the `Errors` class.

## Build 122 to 125 (v1.2.2-beta to v1.2.5-beta)

### Added Features

_No added features._

### Changed/Fixed Features

- Fixed an issue in the configuration creation which caused the "Failed to create configuration file" error on boot.
- Changed clear screen statements internally.

### Removed Features

- Removed the ability to use slashes (`/`) for arguments in commands and launching BubbleOS.

## Build 116 to 122 (v1.1.6-beta to v1.2.2-beta)

HAPPY APRIL FOOLS!!! XD

### Added Features

- Added the `-u` flag to `sysinfo`, which displays user information. It also displays it by default.
- Added the `link` command, which creates [hard links](https://learn.microsoft.com/en-us/windows/win32/fileio/hard-links-and-junctions) on the system.
- Added the `lock` command, which locks the system. Works on Windows, macOS, and Linux.
- Added an internal feature that creates a configuration file for BubbleOS to use. However, it currently is not used, and there is a bug which will say that BubbleOS failed to create the file, even if it was successfully created.

### Changed/Fixed Features

- Changed the yes/no prompt to accept more lenient answers such as typos.
- Fixed an issue where the `ls` command, by default, could not read out of the CWD if it had spaces.
- Fixed an issue where the pre-boot interpreter would not run some commands (e.g. `ping`).

### Removed Features

- Removed the `userinfo` command.

## Build 112 to 116 (v1.1.2-beta to v1.1.6-beta)

### Added Features

- Added a feature where you can change into a symbolic link directory in BubbleOS using the `cd` command.
- Added the full operating name in the `sysinfo` command.
- Added a feature where the `symlink` command, if run with the `-c` flag and if the path was a symbolic link, will show the path it points to. Colors have also been updated for it.
- Added help messages for commands such as `hash`, `ping`, and `tasklist`.

### Changed/Fixed Features

- Updated error handing on the `ping` command.
- Fixed an issue where the `symlink` command would crash BubbleOS upon running it.
- Fixed an issue where the `tasklist` command would crash BubbleOS when run in the executable version.
- Changed the text that displays when running `bubble -v`.
- Fixed an issue where `mkfile` would crash when attempting to ask the user for file contents.
- Fixed an issue where BubbleOS would count ARM64 devices as an invalid architecture.

### Removed Features

_No removed features._

## Build 108 to 112 (v1.0.8-beta to v1.1.2-beta)

### Added Features

- Added the `hash` command, which can check hashes for files.
- Added the double-quote interpreter for paths in all commands.
- Added a check which will check if BubbleOS is not running on a x64 device and/or Windows 8.1 and below. If either are true, BubbleOS will crash on startup. This can be disabled by using the `--no-checks` flag (at your own risk).
- Added a beep sound which will sound when a fatal error occurs.
- Added the BubbleOS PID to the fatal error technical information (but not to the dump file).

### Changed/Fixed Features

- Changed the text in the fatal error.
- Fixed an issue where the command interpreter would classify commands such as `clsls` to be correct, for example (as it starts with a valid command, `cls`).
- Fixed an issue where entering nothing in some commands would result in BubbleOS crashing.

### Removed Features

_No removed features._

## Build 100 to 108 (v1.0.0 to v1.0.8-beta)

### Added Features

- Added the ability to use double quotes to specify paths with spaces in commands, instead of the `*s` keyword. Currently only available on `cd` and `copy`.
- Added help aliases that will appear if you enter in a command that doesn't exist, but has an alias.
- BubbleOS will not check if it is running with elevated privileges, and if so, it will display a warning at startup.
- Added the `tasklist` command, which shows all running processes and their respective PID.
- Added the `ping` command, which sends a request to a specified server.
- Added a confirmation prompt for display network interfaces in `ifnet`. (Also a small Easter egg relating to it!)

### Changed/Fixed Features

- Fixed an issue where the entire command entered would show as 'not recognized'.
- Updated the cancellation message from '_Operation cancelled._' to '_Process aborted._'.
- Fixed an issue where if invalid characters were entered in `taskkill`, in the error, it will show the received text as `NaN`.

### Removed Features

- Removed the _no command_ error.
- Internally removed the `TIMEBOMB_COUNT` variable.

## Build 98-100 (v0.9.8-v1.0.0)

**This is a stable release of BubbleOS!**

### Added Features

- Added a prompt for the phrase to find in the `fif` command.
- Added the `--no-intro` flag to the BubbleOS executable, which disables the intro at startup.

### Changed/Fixed Features

- Fixed an issue where characters such as `?` or `:` would crash BubbleOS when entered in `fif`.
- Fixed an issue where the `fif` command did a case-insensitive search.
- Updated the tips in the `tips` command.
- Changed the structure of dates from _{day}/{month}_ to _{month}/{day}_.
- Corrected some spelling mistakes in BubbleOS.

### Removed Features

- Removed the 'phrase' argument in the `fif` comamnd.

## Build 84-98 (v0.8.4-v0.9.8)

_Note: This is the last beta build, and thus has lots of bug fixes and features, but no new commands have been introduced._

### Added Features

- Added more information to the `fif` command, including a occurrence viewer.
- Added the `-s` flag to many commands, which silences all success messages to _stdout_, except for error messages.
- Added a feature to the `exec` command, where it can execute files as well as executables with their respective default viewer.
- Added tips to the `tips` command.
- Added a lot of information to the `sysinfo` command, including system resources, advanced information, and arguments.
- Added the `--no-dump` flag to the main BubbleOS executable, which will disable file dumping in the case a fatal error occurs.
- Added an optional argument to `crash` where you can enter the index of the way you want to crash BubbleOS.
- Added the ability to create parent directories in `mkdir` if they do not exist.
- Added a feature where the `readfile` command has certain character limits.
- Added a twelve-hour clock to the `time` command (however, it can be switched by using the `-24` flag).
- Added flags to the `exec` command such as `-h` and `--sh`.
- Added a friendly-style date in `date`, like so: _{day}, the {date} of {month} {year}_.
- The `ls` command now will print the short version (`-s`) in sorted rows, of which size will change depending on the length of the name of the largest file/folder.
- The `copy` and `rename` commands will now warn you if the destination already exists (only if the destination exists).
- Added startup warnings for dangerous BubbleOS flags such as `--no-timebomb`. These can be disabled using the `--no-warnings` flag.
- Added 'lines' and 'characters excluding whitespace' properties in the `wcount` command. Also, you can filter it using arguments.
- Added a safeguard against killing the BubbleOS process in `taskkill`. However, this can be ignored by using the `--kill-self` flag.
- Added the user temporary path to the `userinfo` command.
- Added the `-c` flag to the `exit` command, which exits BubbleOS, and then clears the screen.

### Changed/Fixed Features

- Fixed an issue where the `cwd` command was unrecognized.
- Fixed an issue where `taskkill` would crash BubbleOS if the PID didn't exist.
- Fixed an issue where `symlink` would crash if the path didn't exist when the `-c` argument was passed.
- Fixed an issue where the confirmation prompt would have '_y/n_' uncolored.
- Updated many success messages in commands.
- Changed the space character from `/s` to `*s` due to issues with Linux and macOS systems.
- Fixed an issue where the `print` command wouldn't output anything after a space.
- Fixed an issue where the pre-boot interpreter would crash BubbleOS.
- Fixed an issue where `mkfile` would crash if a directory passed in didn't exist.
- Fixed an issue where characters such as `*` or `+` would crash BubbleOS if entered.
- Renamed the `-r` flag in `sysinfo` to `-s` (system resources filter flag).
- Fixed an issue where the `bub` command would report plain text files as an '_invalid encoding_'. Also, if the file didn't end with `.bub`, BubbleOS would crash.
- Internally renamed `aboutConsts.js` to `constants.js`.

### Removed Features

- BubbleOS will not longer automatically add `.bub` to the end of a file when running `bub`.
- Removed the need to add the `--sizes=` flag to the `size` command. Instead, use separate arguments.
- Removed the `prompt.js`, `mainArgs.js` and `multiParam.js` files internally.

## Build 78-84 (v0.7.8-v0.8.4)

### Added Features

- Added the `crash` command, which crashes BubbleOS (and your computer ;) ) in multiple different ways!
- Added a memory dump to the fatal error, as well as a heap snapshot and saved error files.
- Added more reuseable verbose messages to more command.
- Added a new `-s` flag for the `cd` command, which silences all outputs to _stdout_ (except verbose and error messages).
- Added new error codes (e.g. `NON_EXISTANT_PATH`).
- Added another Easter egg!

### Changed/Fixed Features

- The `crash` command will now leak more memory than before.
- Changed the confirmation prompt to automatically enter when you press a key.
- Fixed an issue where BubbleOS would crash when using `mkfile`/`mkdir` if the path exceeded `MAX_PATH`.
- Fixed an issue where making a directory/file with invalid characters would crash BubbleOS.
- BubbleOS will now crash with a fatal error if the timebomb has expired, after displaying a message.
- Fixed an issue where running `bub` would crash BubbleOS (it was a simple typo).

### Removed Features

- Removed the `--kill` flag (use the `crash` command instead).
- Removed the Discord server link in `about` as the server was deleted.

## Build 75-78 (v0.7.5-v0.7.8)

### Added Features

- Combined the `copyfile` and `copydir` commands into the `copy` command.
- Added an Easter Egg in the `about` command :)
- Added the `-v`/`--version` flag to BubbleOS to display the version of it (e.g. `bubble.exe -v`).
- Added the `--kill` flag to BubbleOS, which crashes it at startup. **ONLY TO BE USED FOR TESTING PURPOSES!**

### Changed/Fixed Features

_No features have been changed/fixed in this release._

### Removed Features

- Removed the `copyfile` and `copydir` commands in favor of the `copy` command.

## Build 69-75 (v0.6.9-v0.7.5)

### Added Features

- Added the `copydir` command, which copies the entire directory structure.
- Added a function in the `symlink` command which creates a [symbolic link](https://en.wikipedia.org/wiki/Symbolic_link) (you can use `-c` to check if it is a symbolic link).
- Added the ability to use the `-y` flag on the `del` command to skip the confirmation prompt.
- Added a timebomb to BubbleOS. However, it can be ignored by running BubbleOS with the `--no-timebomb` flag.
- Added more information to the `help` command.
- The `ls` command will now recognize symbolic files/folders and color them accordingly (red).

### Changed/Fixed Features

- Fixed a major issue (which was present ever since the command was first available) where the `cls` command would not clear the _entire_ screen, but just the contents displayed.
- Fixed an issue where `bub` would crash with a `FATAL ERROR`.
- Renamed the `symblnk` command to `symlink`.
- Changed the underlying code of interpretting commands to make it faster.

### Removed Features

- Removed the `_prepVerbose` function internally.
- Removed the `_singleParam` function internally.

## Build 63-69 (v0.6.3-v0.6.9)

### Added Features

- Added the `symblnk` comamnd, which checks if a path is a [symbolic link](https://en.wikipedia.org/wiki/Symbolic_link).
- Added the `tips` command (however, there are no tips currently).
- Added a new `Errors` class internally to make error messages streamlined.
- Added more error messages, and replaced placeholder ones. Also added a technical error code at the end of some errors.
- Added a thanks to Erik and B-Kernel in the `about` command.
- Added the BubbleOS Discord server link in the `about` command.

### Changed/Fixed Features

- Fixed an issue where Linux and macOS could not read files/directories.
- Updated the errors' internal code and messages.
- Updated the _FATAL ERROR_ screen to include more technical information.
- Fixed an issue where on some systems, BubbleOS could not be run successfully (crash on startup).
- Fixed an issue where the `bub` command would crash BubbleOS.
- Fixed an issue where the `help` command would crash BubbleOS.

### Removed Features

- Removed the `ERRORS` variable and the `errorInt` function.

## Build 55-63 (v0.5.5-v0.6.3)

### Added Features

- Added the `bub` command, which can interpret BubbleOS commands line-by-line in a file, similar to a `.bat`/`.cmd` file. You can also run it with the `-d` flag to show the commands that it is executing.
- Added a pre-boot interpreter, which can execute one command when run (for example, `bubble.exe mkdir test`). It will exit as soon as the command has executed.
- Seperated the `time` and `date` commands, adding two seperate ones (**not** aliases).
- Added the `-s`/`/s` flag for the `ls` command to display folder contents in a shorter view.

### Changed/Fixed Features

- Edited some error messages.
- Fixed an issue where viewing the license using `about -l` would sometimes show as nothing on a low-color _stdout_.
- Made the year/name of the license in `about` dynamic.
- Made underlying code of `ls` reuseable.

### Removed Features

_No features have been removed in this release._

## Build 52-55 (v0.5.2-v0.5.5)

### Added Features

- Added the `-l`/`/l` flag for the `about` command to display the MIT license.
- Added the `/verbose` flag alongside the `--verbose` flag.
- Added the verbose option for the `copyfile` command.

### Changed/Fixed Features

- Changed error codes dramatically; they are now reused and only 12 are available to make it easier to troubleshoot.
- Fixed an issue where `ls` would crash BubbleOS with a `FATAL ERROR` if a file was passed.
- Changed a few error messages to warning messages.

### Removed Features

- Removed lots of error codes (around 50-60) and messages.

## Build 48-52 (v0.4.8-v0.5.2)

### Added Features

- Added the `ifnet` command, which returns all network interfaces and information about them running on your computer.
- Added the `cwd` command, which returns the current working directory.
- Added the `--verbose` flag for the `cd` command again, but it has changed (e.g. messages)!
- Added the ability to use `/s` to use any file/directory that contains spaces.

### Changed/Fixed Features

- Changed the way the OS displays in `sysinfo` to be more user-friendly.
- Changed the intro; added the build number and removed the year.
- Changed the way error messages display (from `Error code 1` to `[1]`).

### Removed Features

_No features have been removed in this release._

## Build 43-48 (v0.4.3-v0.4.8)

### Added Features

- Added the `fif` (find in file) command.
- Added a fatal error screen which will occur when there is an unknown/unhandled exception.
- Added a beta software disclaimer.
- Made the _BubbleOS_ name universally changeable from a single variable, as well as others including the author, version, and the beta state.

### Changed/Fixed Features

- Changed error codes (from a `0x00--` style to `--` style, e.g. `0x0078` would be `78`), and error messages.
- Changed the number of historical stores from 20 to 50.
- Fixed a major bug where `ls` would not read out of the current working directory.
- Fixed a major issue in the `cd` command where it would crash the entire shell if no argument was passed.

### Removed Features

- Removed the `constants.js` file and relocated/recoded the `DEFINITIONS` and `ERROR_MESSAGES` objects.
- Removed the `--verbose` flag ability for the `cd` and `ls` commands temporarily (help documentation for it still exists).

## Build 39-43 (v0.3.9-v0.4.3)

### Added Features

- Added the `--size=(sizes)` flag for the `size` command.
- Added the `history` command.
- Added the `--verbose` flag for the `ls` command.

### Changed/Fixed Features

- Increased decimal places for the `size` command from _2_ to _4_.
- Changed file structure slightly (moved `variables` into `src`).

### Removed Features

- Removed the file `variables.js`.
- Removed the file `error.js`.
- Removed the `RECOGNIZED_COMMANDS` variable.

## Build 35-39 (v0.3.5-v0.3.9)

### Added Features

- Added verbose status messages for the `cd` command. More are coming for later versions.
- Added the `time` and `date` command (both are aliases).
- Added the `rename` command.
- Added the `size` command.
- Extracted absolute path convertion into a seperate function: `_convertAbsolute`.

### Changed/Fixed Features

_No features have been changed/fixed in this release._

### Removed Features

- Deprecated the `date` variable.

## Build 27-35 (v0.2.7-v0.3.5)

### Added

- Added the `del` command in place of `rmdir` and `rmfile`.
- Added the `wcount` command.
- Added the `print` command.
- Added the `userinfo` command.
- _Tried to add the `tasklist` command, but it didn't work, so I had to remove it :(_

### Changed

- Updated error codes and error messages.
- Changed the name of the OS from BubbleOS Lite to BubbleOS.

### Removed

- Removed the `rmdir` and `rmfile` commands in favor for the `del` command.

## Build 23-27 (v0.2.3-v0.2.7)

### Added

- Added alphabetised sorting for the `help` command.
- Added better validation for the PID for `taskkill`.
- Added help information for the `cls` command.
- Added error codes.
- Extracted argument repition into seperate function `_singleParam`.
- Added `CHANGELOG.md`.
- A few more minor Easter Eggs.

### Changed

- Fixed an issue where `rmdir` crashes `explorer.exe` on Windows sometimes.
- Fixed an issue which would cause terminal characters to temporarily be corrupted when reading a non-UTF-8 file with `readfile` (the functionality to read binaries has been removed).
- Fixed an issue where `ls` would crash BubbleOS entirely if the directory was invalid.
- Updated the `error` function to make it more reuseable and lightweight.
- Updated `cd` command to handle no directories.
- Improved code reusability.

### Removed

- Deprecated the `RECOGNIZED_COMMANDS` constant.
