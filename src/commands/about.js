const chalk = require("chalk");

const date = require("../../variables/variables").date;
const VERSION = require("../../variables/constants").VERSION;

const about = () => {
  console.log(chalk.underline.bold("About BubbleOS Lite\n"));

  console.log(`BubbleOS Lite, ${date} (v${VERSION})`);
  console.log(`Copyright (c) ${date} Bubble, Inc. All rights reserved.\n`);

  console.log(`Made by ${chalk.red("Arnav Thorat")}.`);
  console.log(
    `GitHub: ${chalk.underline.blueBright("https://github.com/arnavthorat78/bubbleos-lite")}\n`
  );
};

module.exports = about;
