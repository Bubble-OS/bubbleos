const chalk = require("chalk");

const ALL_TIPS = [
  "Use '-s' on the 'ls' command to view files and directories in a shorter view!",
  "There is a fatal error screen, but if you haven't seen it, it's for the better...",
  "You can use the 'rename' command to move a file, like 'copyfile'!",
];

const doneTips = [];

const tips = () => {
  const MAXIMUM_TRIES = 50;

  for (let tryNum = 0; tryNum < MAXIMUM_TRIES; tryNum++) {
    let randNum = (Math.random() * ALL_TIPS.length).toFixed(0);

    if (!doneTips.includes(randNum)) {
      if (typeof ALL_TIPS[randNum] === "undefined") continue;

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
  return;

  // ALL_TIPS.forEach((tip, idx) => {
  //   if (!doneTips.includes(idx)) {
  //     console.log(chalk.yellow(`${chalk.bold("TIP:")} ${tip}`));
  //     doneTips.push(idx);
  //     return;
  //   }
  // })
};

module.exports = tips;
