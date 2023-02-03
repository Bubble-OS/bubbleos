const chalk = require("chalk");

const { GLOBAL_NAME, AUTHOR, VERSION, IN_BETA } = require("../variables/aboutConsts");

const about = () => {
  const year = new Date().getFullYear();

  console.log(chalk.underline.bold.red(`About ${GLOBAL_NAME}\n`));

  console.log(`${GLOBAL_NAME}, ${year} (v${VERSION})`);
  console.log(`Made by ${AUTHOR}!\n`);

  console.log(`GitHub: ${chalk.underline.blueBright("https://github.com/Bubble-OS/bubbleos")}`);
  console.log(`YouTube: ${chalk.underline.blueBright("https://youtube.com/InfiniTech78")}\n`);
};

module.exports = about;
