const chalk = require("chalk");

const { GLOBAL_NAME } = require("../variables/constants");

const _fatalError = require("../functions/fatalError");

const Verbose = require("../classes/Verbose");

/**
 * All tips that can be chosen by BubbleOS.
 */
const ALL_TIPS = [
  `Hello! We're resetting tips; they'll come back in the next stable release of ${GLOBAL_NAME} (build 200)!`,
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
 * @param {...string} args Arguments to modify the behavior of `tips`.
 */
const tips = (...args) => {
  try {
    Verbose.custom(`Tips in 'ALL_TIPS': ${ALL_TIPS.length}`);
    Verbose.custom(`Tips in 'doneTips': ${doneTips.length}`);

    // As long as BubbleOS has not exceeded the maximum tries, keep looping
    for (let tryNum = 0; tryNum < MAXIMUM_TRIES; tryNum++) {
      Verbose.custom("Trying to find a tip...");
      let randNum = (Math.random() * ALL_TIPS.length).toFixed(0);

      // If the tip has not already been shown
      if (!doneTips.includes(randNum)) {
        if (typeof ALL_TIPS[randNum] === "undefined") continue;

        Verbose.custom("Showing tip...");
        console.log(chalk.hex("#FFA500")`${chalk.bold("TIP:")} ${ALL_TIPS[randNum]}\n`);

        doneTips.push(randNum);
        return;
      }
    }

    console.log(
      chalk.yellow(
        "Either there are no more tips available, or the maximum tries for finding a tip have been exceeded.\n"
      )
    );
  } catch (err) {
    _fatalError(err);
  }
};

module.exports = tips;
