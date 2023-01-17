const chalk = require("chalk");
const { DEFINITIONS } = require("../variables/constants");

for (const command in DEFINITIONS) {
    console.log(`${chalk.red(command)}${chalk.blue(":")} ${DEFINITIONS[command].description}`);
    console.log(`    ${chalk.underline(DEFINITIONS[command].usage.join(", "))}`);

    console.log();
}

console.log(
    chalk.yellow(
        `${chalk.bold("Tip:")} Use ${chalk.red(
            "help <command>"
        )} to see help for one specific command.`
    )
);

console.log();
