const chalk = require("chalk");

const { GLOBAL_NAME, AUTHOR, VERSION, BUILD } = require("../variables/aboutConsts");

const about = () => {
  console.log(chalk.underline.bold.red(`About ${GLOBAL_NAME}\n`));

  console.log(`${GLOBAL_NAME}, v${VERSION} (build ${BUILD})`);
  console.log(`Made by ${AUTHOR}!\n`);

  console.log(`GitHub: ${chalk.underline.blueBright("https://github.com/Bubble-OS/bubbleos")}`);
  console.log(`YouTube: ${chalk.underline.blueBright("https://youtube.com/InfiniTech78")}\n`);
};

module.exports = about;
