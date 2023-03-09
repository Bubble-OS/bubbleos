// Get packages
const chalk = require("chalk");

// Get variables
const { GLOBAL_NAME, AUTHOR, VERSION, BUILD } = require("../variables/constants");

// Get functions
const _fatalError = require("../functions/fatalError");

/**
 * The `about` command.
 *
 * This command does not return any information;
 * it is only to be ran in the BubbleOS shell.
 * This command only prints to _stdout_.
 *
 * Usage:
 * ```js
 * about("-l"); // Arguments are optional
 * ```
 *
 * Available arguments:
 * - `-l`: Show the license.
 *
 * @param  {...string} args A list of arguments that can be used to modify the behavior of `about`.
 */
const about = (...args) => {
  try {
    // Initialize recognized arguments
    const license = args?.includes("-l") || args?.includes("/l");
    const binary = args?.includes("--ilovetech") || args?.includes("/ilovetech");

    // For the Easter egg :)
    let aboutName = GLOBAL_NAME;
    if (binary)
      aboutName = "01000010 01110101 01100010 01100010 01101100 01100101 01001111 01010011";

    // Print out information about BubbleOS
    console.log(chalk.underline.bold.red(`About ${aboutName}\n`));

    console.log(`${aboutName}, v${VERSION} (build ${BUILD})`);
    console.log(`Made by ${AUTHOR}!\n`);

    console.log(
      chalk.italic("Thanks to Erik (and B-Kernel) for helping out with a few command ideas!\n")
    );

    if (license) {
      console.log(
        chalk.dim(`    MIT License

    Copyright (c) ${new Date().getFullYear()} ${aboutName}
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.\n`)
      );
    }

    console.log(`GitHub: ${chalk.underline.blueBright("https://github.com/Bubble-OS/bubbleos")}`);
    console.log(`YouTube: ${chalk.underline.blueBright("https://youtube.com/InfiniTech78")}\n`);
  } catch (err) {
    // An unknown error occurred
    _fatalError(err);
  }
};

// Export the function
module.exports = about;
