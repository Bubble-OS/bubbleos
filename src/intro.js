const chalk = require("chalk");

const { VERSION } = require("../variables/constants");

const year = new Date().getFullYear();

console.log(`${chalk.bold(`BubbleOS, ${year} (v${VERSION})`)}`);
console.log(`Copyright (c) ${year} Bubble, Inc. All rights reserved.\n`);

console.log(`For help on some available commands, type ${chalk.italic("help")}.`);
console.log(`For more information about a command, type ${chalk.italic("help <command>")}.\n`);

console.log(`To exit the BubbleOS shell, type ${chalk.italic("exit")}.\n`);
