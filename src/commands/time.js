const chalk = require("chalk");

const time = () => {
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

  console.log(chalk.bold(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`));
  console.log(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
  console.log(chalk.dim(`${days[date.getDay()]}, ${months[date.getMonth()]}`));
};

module.exports = time;
