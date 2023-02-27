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

  const date = new Date();

  const friendlyDate =
    date.getDate() === 1 || date.getDate() === 21 || date.getDate() === 31
      ? `${date.getDate()}st`
      : date.getDate() === 2 || date.getDate() === 22
      ? `${date.getDate()}nd`
      : date.getDate() === 3 || date.getDate() === 23
      ? `${date.getDate()}rd`
      : `${date.getDate()}th`;
  console.log(
    `${days[date.getDay()]}, the ${friendlyDate} of ${
      months[date.getMonth()]
    }, ${date.getFullYear()}`
  );
  console.log(chalk.italic(`(${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()})`));

  console.log();
};

module.exports = date;
