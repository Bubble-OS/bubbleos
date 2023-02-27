const chalk = require("chalk");

const time = (...args) => {
  const isTwelveHours = !(args.includes("-24") || args.includes("/24"));

  const rawTime = new Date();
  const time = `${rawTime.getHours()}:${rawTime.getMinutes()}:${rawTime.getSeconds()}`;

  const convertTime = (time) => {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }

    return time.join(""); // Return adjusted time or original string
  };

  const twelveTime = convertTime(time);

  if (isTwelveHours) console.log(chalk.bold(twelveTime));
  else console.log(chalk.bold(time));

  console.log();
};

module.exports = time;
