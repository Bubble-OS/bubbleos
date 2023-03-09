// Import modules
const chalk = require("chalk");
const { keyInSelect } = require("readline-sync");

// Import variables
const { GLOBAL_NAME } = require("../variables/constants");

// Import functions
const _promptForYN = require("../functions/promptForYN");
const _fatalError = require("../functions/fatalError");

/**
 * **USE WITH CAUTION!**
 *
 * Crash BubbleOS and the terminal in many ways. This is a CLI tool,
 * meaning it has a selection prompt.
 *
 * Usage:
 *
 * ```js
 * crash(); // An index can also be passed
 * ```
 *
 * If no `index` was passed, BubbleOS will request the user to select
 * a crashing method from a list of elements. These are the following
 * current ways that a user can crash BubbleOS, their terminal, or even
 * their computer:
 * - _Fatal error_: Crash BubbleOS with a fatal error. File dumping is
 * enabled.
 * - _Hang_: Hangs the terminal completely in some scenarios, making it
 * almost impossible to press `^C` and forcing the user to force shut it
 * down using a command such as `taskkill` on Windows, or `kill`/`killall`
 * on Linux (supposing you can use the terminal).
 * - _Memory leak_: Leaks memory from the computer by making multiple arrays.
 * This is a very dangerous command, especially for low-memory systems,
 * as it can leak about 4-8GB of memory.
 *
 * @param {number | string} index Optional. Uses this as the index for the crashing method. Defaults to `NaN`.
 * @param  {...string} args Arguments to change the behavior of the `crash` command. Unused right now.
 */
const crash = (index = NaN, ...args) => {
  try {
    /**
     * A list of all the crashes that are possible.
     */
    const AVAILABLE_CRASHES = [`Fatal Error (${GLOBAL_NAME})`, "Hang", "Memory Leak"];

    // Show a warning
    console.log(
      chalk.red.bold(
        `${chalk.bgRed.white(
          " WARNING! "
        )} Using this command can cause issues such as loss of data, high CPU/RAM usage, and more. Save all data before continuing.`
      )
    );

    // If the index isn't 'not a number'
    if (!isNaN(index)) {
      // If the index was provided, minus one out of it due to JS' array structure :)
      index = index - 1;
      console.log();
    } else {
      // If no index was provided, prompt the user for one
      index = keyInSelect(AVAILABLE_CRASHES, "Please select your crashing method");
    }

    if (index === -1 || index === NaN) {
      // If the user 'cancelled' on the prompt, or the index is for some reason not a number, exit
      console.log(chalk.yellow("Operation cancelled.\n"));
      return;
    } else if (index > AVAILABLE_CRASHES.length - 1 || index < 0) {
      // If the index is greater than the length of the crash array, or is less than 0
      console.log(
        chalk.yellow(`Unknown crash method at index ${index + 1}.\nPrompting for a new index...`)
      );

      index = keyInSelect(AVAILABLE_CRASHES, "Please select your crashing method");
      if (index === -1 || index === NaN) {
        console.log(chalk.yellow("Operation cancelled.\n"));
        return;
      }
    }

    // Confirm that the user wants to crash BubbleOS
    if (
      !_promptForYN(
        `You have chosen ${chalk.italic(
          `'${AVAILABLE_CRASHES[index]}'`
        )}. Are you sure you want to do this?`
      )
    ) {
      // If they provided anything but 'y', exit
      console.log(chalk.yellow("Operation cancelled.\n"));
      return;
    }

    console.log();

    if (index === 0) {
      // Fatal error
      throw new Error("BubbleOS was purposefully crashed with the 'crash' command.");
    } else if (index === 1) {
      // Crash BubbleOS by continuously writing 'clear screen' to the terminal.
      // This can make the terminal hang, and sometimes make it impossible to press ^C.
      while (true) {
        process.stdout.write("\033c");
      }
    } else if (index === 2) {
      // Node.js will crash once the heap has run out of memory
      console.log(
        chalk.yellow(
          `${chalk.bold(
            "NOTE:"
          )} BubbleOS will crash once memory usage has hit its maximum allocated memory space.\n`
        )
      );

      // While 'i' is less than the maximum number that JS can handle,
      // add a new array to the 'crashArr' with 100000000 'null' elements
      const crashArr = [];
      for (let i = 0; i < Number.MAX_VALUE; i++) {
        crashArr.push(new Array(100000000));
      }
    } else {
      // If, for some reason, the index didn't match any of the above.
      console.log(chalk.yellow(`Unknown.\n`));
      return;
    }
  } catch (err) {
    // If an unknown exception occurred, or the user selected to purposely crash BubbleOS with a fatal error
    _fatalError(err);
  }
};

// Export the function
module.exports = crash;
