const prompt = require("./src/prompt");

const error = require("./src/error");

const cd = require("./src/commands/cd");

require("./src/intro");

while (true) {
  const command = prompt();

  error(command);

  if (command.isExit) {
    require("./src/exit");
  }

  if (command.command.includes("cd")) {
    const directory = command.command.split("cd")[1];

    cd(directory?.trim());
  }
}
