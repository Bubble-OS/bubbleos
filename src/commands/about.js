const {
  bold: chalkBold,
  underline: chalkUnderline,
  red: chalkRed,
  blueBright: chalkBBlue,
} = require("chalk");

const date = require("../../variables/variables").date;
const VERSION = require("../../variables/constants").VERSION;

const about = () => {
  console.log(chalkUnderline(chalkBold("About BubbleOS Lite\n")));

  console.log(`BubbleOS Lite, ${date} (v${VERSION})`);
  console.log(`Copyright (c) ${date} Bubble, Inc. All rights reserved.\n`);

  console.log(`Made by ${chalkRed("Arnav Thorat")}`);
  console.log(
    `GitHub: ${chalkUnderline(chalkBBlue("https://github.com/arnavthorat78/bubbleos-lite"))}`
  );
  console.log(`YouTube: ${chalkUnderline(chalkBBlue("https://youtube.com/InfiniTech78"))}\n`);
};

module.exports = about;
