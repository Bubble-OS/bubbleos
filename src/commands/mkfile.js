// Get modules
const fs = require("fs");
const chalk = require("chalk");
const { question, questionInt } = require("readline-sync");

// Get functions
const _parseDoubleQuotes = require("../functions/parseQuotes");
const _convertAbsolute = require("../functions/convAbs");
const _fatalError = require("../functions/fatalError");

// Get classes
const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");
const _promptForYN = require("../functions/promptForYN");
const path = require("path");

/**
 * Make a file synchronously using `fs.mkfileSync()`.
 * This is a CLI tool for use with the BubbleOS
 * shell.
 *
 * Usage:
 *
 * ```js
 * mkfile("test.txt"); // Arguments accepted!
 * ```
 *
 * If a parent directory does not exist, this command
 * will not work.
 *
 * Note that there is a small hiccup in the error
 * codes, where if the path/file names are too long,
 * Linux and macOS will show the error code correctly
 * as `ENAMETOOLONG`, but Windows will show it as
 * `EINVAL`.
 *
 * Available arguments:
 * - `-s`: Silence all outputs to the standard output,
 * which includes the success message. Only error
 * messages are shown.
 *
 * @param {fs.PathLike | string} file The file that should be created. Both absolute and relative paths are accepted.
 * @param  {...string} args Arguments to change the behavior of `mkfile()`. Available arguments are listed above.
 */
const mkfile = (file, ...args) => {
  try {
    // Replace spaces and then convert the file to an absolute path
    file = _convertAbsolute(_parseDoubleQuotes([file, ...args])[0]);

    // Initialize checker
    const fileChk = new Checks(file);

    // Initialize arguments
    const silent = args?.includes("-s");

    // If the file was not defined
    if (fileChk.paramUndefined()) {
      Errors.enterParameter("a file", "mkfile test.txt");
      return;
    }

    // If the file already exists
    if (fileChk.doesExist()) {
      if (
        _promptForYN(
          `The file, '${chalk.italic(
            path.basename(file)
          )}', already exists. Would you like to delete it?`
        )
      ) {
        try {
          fs.rmSync(file, { recursive: true, force: true });
          console.log(chalk.green(`Successfully deleted ${chalk.bold(file)}.\n`));
        } catch {
          if (err.code === "EPERM") {
            Errors.noPermissions("delete the file", file);
          } else if (err.code === "EBUSY") {
            Errors.inUse("file", file);
          }

          return;
        }
      } else {
        console.log(chalk.yellow("Process aborted.\n"));
        return;
      }
    }

    console.log(
      `Add the content of the new file. Type ${chalk.italic(
        "'!SAVE'"
      )} to save changes, ${chalk.italic("'!CANCEL'")} to discard, or ${chalk.italic(
        "'!EDIT'"
      )} to modify previous input:\n`
    );

    // Collect new content line by line
    let contents = [];
    while (true) {
      const input = question("> ");

      if (input.toUpperCase() === "!SAVE") {
        // Save the new content to the file, ensuring no trailing newline
        fs.writeFileSync(file, contents.join("\n"), "utf8");

        // If the user requested output, show a success message, else, show a newline
        if (!silent) console.log(chalk.green(`Successfully made the file ${chalk.bold(file)}.\n`));
        else console.log();
        return;
      } else if (input.toUpperCase() === "!CANCEL") {
        console.log(chalk.yellow("Edits discarded and process aborted."));
        return;
      } else if (input.toUpperCase() === "!EDIT") {
        if (contents.length === 0) {
          console.log(chalk.yellow("No previous input to edit.\n"));
        } else {
          const lineNumber = questionInt(
            chalk.blue("Choose a line number to edit (1-" + contents.length + "): ")
          );
          if (lineNumber >= 1 && lineNumber <= contents.length) {
            const newLine = question(`Edit line ${lineNumber}: `, { defaultInput: "\n" });

            contents[lineNumber - 1] = newLine; // Replace the selected line
            console.log(chalk.green(`Line ${lineNumber} has been updated.\n`));
          } else {
            console.log(chalk.red("Invalid line number.\n"));
          }
        }
      } else {
        // Add the input to the contents
        contents.push(input);
      }
    }
  } catch (err) {
    if (err.code === "ENOENT") {
      // If the parent directory does not exist
      Errors.doesNotExist("file", file);
      return;
    } else if (err.code === "EPERM") {
      // No permissions to make the file
      Errors.noPermissions("make the file", file);
      return;
    } else if (err.code === "ENAMETOOLONG") {
      // Name too long
      // This code only seems to appear on Linux and macOS
      // On Windows, the code is 'EINVAL'
      Errors.pathTooLong(file);
      return;
    } else if (err.code === "EINVAL") {
      // Invalid characters; basically just goes for Windows
      // NTFS' file system character limitations
      // However, Windows also uses this code when the file
      // path exceeds 260 characters, or when the file name
      // exceeds 255 characters
      Errors.invalidCharacters(
        "directory name",
        "valid path characters",
        "characters such as '?' or ':' (Windows only)",
        dir
      );
      return;
    } else {
      // Unknown error
      _fatalError(err);
    }
  }
};

// Export the function
module.exports = mkfile;
