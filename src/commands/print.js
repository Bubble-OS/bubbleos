import chalk from "chalk";

/**
 * Print text to screen. Named `printText` instead of `print` to avoid naming collisions.
 *
 * @param {string} text The text to output.
 */
const printText = (text) => {
  if (!text) {
    console.log(chalk.yellow("No text was provided to output.\n"));
    return;
  }

  console.log(`${text}\n`);
};

export default printText;
