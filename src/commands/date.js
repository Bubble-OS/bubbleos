const chalk = require("chalk");

const date = () => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // TODO Add options for what type of date to show
  const date = new Date();

  console.log(chalk.dim.underline("Current date:"));
  console.log(chalk.bold(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`));
  console.log(`${days[date.getDay()]}, ${months[date.getMonth()]}\n`);
};

module.exports = date;
