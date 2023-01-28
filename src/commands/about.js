const chalk = require("chalk");

const { VERSION } = require("../variables/constants");

const about = () => {
  const year = new Date().getFullYear();

  console.log(chalk.underline.bold("About BubbleOS\n"));

  console.log(`BubbleOS, ${year} (v${VERSION})`);
  console.log(`Copyright (c) ${year} Bubble, Inc. All rights reserved.\n`);

  console.log(`Made by ${chalk.red("Arnav Thorat")}`);
  console.log(`GitHub: ${chalk.underline.blueBright("https://github.com/Bubble-OS/bubbleos")}`);
  console.log(`YouTube: ${chalk.underline.blueBright("https://youtube.com/InfiniTech78")}\n`);

  if (process.platform === "linux")
    console.log(chalk.black.dim("What's your favorite Linux distro, BTW?"));
};

module.exports = about;
