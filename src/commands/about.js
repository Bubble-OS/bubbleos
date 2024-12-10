// Get packages
const chalk = require("chalk");

// Get variables
const { GLOBAL_NAME, AUTHOR, VERSION, BUILD } = require("../variables/constants");

// Get functions
const Verbose = require("../classes/Verbose");

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
    Verbose.initArgs();
    const license = args?.includes("-l");
    const binary = args?.includes("--ilovetech");

    // For the Easter egg :)
    let aboutName = GLOBAL_NAME;
    if (binary)
      aboutName = "01000010 01110101 01100010 01100010 01101100 01100101 01001111 01010011";

    // Print out information about BubbleOS
    Verbose.custom("Displaying information...");
    console.log(chalk.underline.bold.red(`About ${aboutName}\n`));

    console.log(`${aboutName}, v${VERSION} (build ${BUILD})`);
    console.log(`Made by ${AUTHOR}!\n`);

    if (license) {
      Verbose.custom("Displaying license...");
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

    console.log(`GitHub: ${chalk.underline.blueBright("https://github.com/arnavt78/bubbleos")}`);
    console.log(`YouTube: ${chalk.underline.blueBright("https://youtube.com/InfiniTech78")}\n`);
  } catch (err) {
    Verbose.fatalError();
    _fatalError(err);
  }
};

// Export the function
module.exports = about;
