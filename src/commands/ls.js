const chalk = require("chalk");
const fs = require("fs");

const ls = (directory = process.cwd()) => {
  const files = fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((item) => !item.isDirectory())
    .map((item) => {
      return { name: item.name, type: "file" };
    })
    .sort();

  const folders = fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => {
      return { name: item.name, type: "folder" };
    })
    .sort();

  const all = [...folders, ...files];

  all.forEach((item) => {
    if (item.type === "file") {
      console.log(chalk.green(item.name));
    } else if (
      item.type === "folder" &&
      (item.name.startsWith(".") || item.name.startsWith("_") || item.name.startsWith("$"))
    ) {
      console.log(chalk.bold.grey(item.name));
    } else {
      console.log(chalk.bold.blue(item.name));
    }
  });

  console.log();
};

module.exports = ls;
