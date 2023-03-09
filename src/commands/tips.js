// Get modules
const chalk = require("chalk");

// Get variables
const { GLOBAL_NAME } = require("../variables/constants");

/**
 * All tips that can be chosen by BubbleOS.
 */
const ALL_TIPS = [
  `To clear the screen when exiting ${GLOBAL_NAME}, run 'exit -c'.`,
  `You can do a 'cut' action by using the 'rename' command and specifying different paths.`,
  `The 'symlink' command should be run with elevated privileges (especially on Windows).`,
  `The 'exec' command can execute files with their default viewer, as well as executables.`,
  `You can use the 'bub' command to make a batch-like file that contains ${GLOBAL_NAME} commands (also supports comments)!`,
  `You can use filter flags on commands such as 'fif', 'size', 'sysinfo' and 'wcount'.`,
  `You can make multiple directories using 'mkdir' by specifying something like 'a/b/c'.`,
  `The 'history' command will start deleting the oldest history point after there are more than fifty stored.`,
  `The 'ifnet' commands shows all running network interfaces on your device!`,
  `The 'readfile' command can only read text files.`,
  `The 'size' command shows sizes in bytes, kilobytes, megabytes and gigabytes.`,
  `To view directory contents in a shorter view, you can run 'ls -s'.`,
  `On almost every command, you can run it with the '-s' flag to silence success messages. Examples include 'cd', 'del', and more.`,
  `The 'symlink' command can also check if a path is a symbolic link by running it with the '-c' flag, as well as making a symbolic link.`,
  `The 'taskkill' command cannot kill the BubbleOS process. You'll need to use the '--kill-self' flag to make it work.`,
  `There are a few Easter eggs in BubbleOS; see if you can find them! ;)`,
  `The 'time' command can be run with the '-24' flag to show the time in 24-hour form.`,
  `If the characters without whitespace and the characters with whitespace are the same, 'wcount' will only show the total characters.`,
  `The 'crash' command gives three options: crash BubbleOS, hang your terminal or leak memory!`,
  `There are a few BubbleOS executable flags that can be used (e.g. '--no-dump')!`,
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
 * @param  {...string} args Arguments to modify the behavior of `tips`.
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
