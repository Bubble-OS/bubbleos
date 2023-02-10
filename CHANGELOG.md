# BubbleOS Changelog

_Note: Only from BubbleOS v0.2.3 will changes be recorded._

Please note that not all versions will have respectible executables with them.

## Build 55-61 (v0.5.5-v0.6.1)

### Added Features

- Added the `-s`/`/s` flag for the `ls` command to display folder contents in a shorter view.
- Made the application much faster and more responsive (around 30% faster).

### Changed/Fixed Features

### Removed Features

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
