# BubbleOS Lite Changelog

_Note: Only from BubbleOS v0.2.2 will changes be recorded._

Please note that not all versions will have respectible executables with them.

## Build 23-25 (v0.2.3-v0.2.5)

### Added

  - Added alphabetised sorting for the `help` command
  - Added better validation for the PID for `taskkill`.
  - Added help information for the `cls` command.
  - Added error codes.
  - Extracted argument repition into seperate function `_singleParam`.
  - Added `CHANGELOG.md`.
  - A few more minor Easter Eggs.

### Changed

  - Fixed an issue which would cause terminal characters to temporarily be corrupted when reading a non-UTF-8 file with `readfile` (the functionality to read binaries has been removed).
  - Fixed an issue where `ls` would crash BubbleOS entirely if the directory was invalid.
  - Updated the `error` function to make it more reuseable and lightweight.
  - Updated `cd` command to handle no directories.
  - Improved code reusability.

### Removed

  - Deprecated the `RECOGNIZED_COMMANDS` constant.