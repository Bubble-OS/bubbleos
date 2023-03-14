// Get modules
const chalk = require("chalk");

// Get variables
const { GLOBAL_NAME } = require("../variables/constants");

/**
 * All tips that can be chosen by BubbleOS.
 */
const ALL_TIPS = [
  `Hello! We're resetting tips; they'll come back in the next stable release (build 200)!`,
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
