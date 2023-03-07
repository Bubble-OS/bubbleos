// Get modules
const chalk = require("chalk");

// Get variables
const { GLOBAL_NAME } = require("../variables/constants");

/**
 * All tips that can be chosen by BubbleOS.
 */
const ALL_TIPS = [
  `When running 'ls' with the '-s' flag, the length of the columns will change depending on the length of the largest file.`,
  `There is a bug in 'ls' where if you were to make a file with lots of characters, and then run 'ls -s', it would break the display!`,
  `The 'cd' command cannot change into any symbolic link directories.`,
  `The 'copy' command will overwrite any files/directories if they exist (which is why there is a confirmation prompt).`,
  `On almost all commands, there is a '-s' flag to hide the success message!`,
  `On Linux, there is a bug where the 'time' command won't show the AM/PM time.`,
  `The 'symlink' command must have ${GLOBAL_NAME} run with elevated privileges on most operating systems.`,
  `${GLOBAL_NAME} was originally intended to be a GUI, but it was too difficult to code.`,
  `There is a similar OS to ${GLOBAL_NAME} called B-Kernel, and a similar GUI OS called Cobalt!`,
  `There is a non-documented flag in the 'tips' command - try it by running 'tips --debug' (it isn't very interesting).`,
  `You can clear the screen with the 'exit' command using the '-c' flag.`,
  `The 'readfile' command can only read plain-text files. It cannot be bypassed, not even with flags, to avoid terminal corruption!`,
  `The 'del' command used to be 'rmdir' and 'rmfile', but was later combined.`,
  `The 'copy' command used to be 'copyfile' and 'copydir', but was later combined into one.`,
  `The 'print' command will never accept flags!`,
  `The 'userinfo' command will show more information on macOS/Linux than on Windows.`,
  `There used to be a bug in 'sysinfo' where the memory usage would show in reverse!`,
  `${GLOBAL_NAME} used to be called 'BubbleOS Lite', and was going to be called 'BubbleShell'!`,
  `The 'taskkill' command will not allow you to kill the ${GLOBAL_NAME} process (however, this can be bypassed).`,
  `The 'wcount' command shows the number of characters, lines, and (you guessed it) words!`,
  `The 'rename' command can be used similarly to the 'copy' command, except that it will remove the source.`,
  `The 'exec' command will not work executing command-based applications; therefore, it is best suited for Windows.`,
  `The 'exec' command used to only work on Windows!`,
  `The 'fif' command used to not highlight occurrences due to a bug in the code.`,
  `The 'crash' command is dangerous (obviously)...`,
];

/**
 * The maximum amount of times that BubbleOS can try to find a tip randomly.
 */
const MAXIMUM_TRIES = 50;

// Tips that have been chosen, so as to not be chosen again
const doneTips = [];

/**
 * Show some tips and fun facts about BubbleOS.
 *
 * Usage:
 *
 * ```js
 * tips(); // No user-intended arguments accepted yet!
 * ```
 *
 * No user-intended arguments are accepted.
 *
 * @param  {...string} args Arguments to modify the behaviour of `tips`.
 */
const tips = (...args) => {
  // Initialize tips
  const debug = args.includes("--debug") || args.includes("/debug");

  // NON-DOCUMENTED FLAG - for use with the dev only!
  if (debug) {
    console.log(`Tips in ${chalk.italic("'ALL_TIPS'")}: ${chalk.bold(ALL_TIPS.length)}`);
    console.log(`Tips in ${chalk.italic("'doneTips'")}: ${chalk.bold(doneTips.length)}`);

    // Newline and return
    console.log();
    return;
  }

  // As long as BubbleOS has not exceeded the maximum tries, keep looping
  for (let tryNum = 0; tryNum < MAXIMUM_TRIES; tryNum++) {
    // Random index
    let randNum = (Math.random() * ALL_TIPS.length).toFixed(0);

    // If the tip has not already been shown
    if (!doneTips.includes(randNum)) {
      // If the tip chosen is for some reason not defined
      if (typeof ALL_TIPS[randNum] === "undefined") continue;

      // Show the tip
      console.log(chalk.hex("#FFA500")`${chalk.bold("TIP:")} ${ALL_TIPS[randNum]}\n`);

      // Add it to the completed tips and end the 'tips' command
      doneTips.push(randNum);
      return;
    }
  }

  // If the loop has ended without a 'return', show the error and return
  console.log(
    chalk.yellow(
      "Either there are no more tips available, or the maximum tries for finding a tip have been exceeded.\n"
    )
  );
  return;
};

// Export the function
module.exports = tips;
