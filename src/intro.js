import chalk from "chalk";

import { GLOBAL_NAME, AUTHOR, VERSION, BUILD, IN_BETA } from "./variables/aboutConsts.js";

console.log(`${chalk.bold(`${GLOBAL_NAME}, v${VERSION} (build ${BUILD})`)}`);
console.log(`Made by ${AUTHOR}!\n`);

if (IN_BETA)
  console.log(
    chalk.dim(
      `${chalk.bold(
        "WARNING!"
      )} This software is in beta and subject to changes.\nThis software is extremely unstable and should not be used for day-to-day use.\n`
    )
  );

console.log(`For help on some available commands, type ${chalk.italic("help")}.`);
console.log(`For more information about a command, type ${chalk.italic("help <command>")}.\n`);

console.log(`To exit the ${GLOBAL_NAME} shell, type ${chalk.italic("exit")}.\n`);
