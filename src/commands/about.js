const chalk = require("chalk");

const { date } = require("../../variables/variables");
const { VERSION } = require("../../variables/constants");

const about = () => {
  console.log(chalk.underline.bold("About BubbleOS\n"));

  console.log(`BubbleOS, ${date} (v${VERSION})`);
  console.log(`Copyright (c) ${date} Bubble, Inc. All rights reserved.\n`);

  console.log(`Made by ${chalk.red("Arnav Thorat")}`);
  console.log(`GitHub: ${chalk.underline.blueBright("https://github.com/Bubble-OS/bubbleos")}`);
  console.log(`YouTube: ${chalk.underline.blueBright("https://youtube.com/InfiniTech78")}\n`);
};

module.exports = about;
