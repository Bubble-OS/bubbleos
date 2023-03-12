const path = require("path");

class Convert {
  constructor() {}

  absolute(convPath) {
    // If the path is not defined or is an empty string, end early and return 'undefined'
    if (typeof convPath === "undefined" || convPath === "") return;

    // Return the absolute path
    return path.resolve(convPath);
  }

  size(bytes) {
    // Convert bytes to kilobytes, megabytes, and gigabytes and change decimal places
    const kilobytes = parseFloat((bytes / 1000).toFixed(decimals));
    const megabytes = parseFloat((kilobytes / 1000).toFixed(decimals));
    const gigabytes = parseFloat((megabytes / 1000).toFixed(decimals));

    // Return all of them as an object
    return {
      bytes,
      kilobytes,
      megabytes,
      gigabytes,
    };
  }

  time(seconds, decimals = 2) {
    const minutes = parseFloat((seconds / 60).toFixed(decimals));
    const hours = parseFloat((minutes / 60).toFixed(decimals));
    const days = parseFloat((hours / 24).toFixed(decimals));

    // Calculate the recommended value by checking if the value is 0, going from days to seconds.
    // It will also suffix the respective type in either plural or singular form (in an object).
    const recommended =
      parseFloat(days.toFixed(0)) !== 0
        ? { value: days, type: days === 1 ? "day" : "days" }
        : parseFloat(hours.toFixed(0)) !== 0
        ? { value: hours, type: hours === 1 ? "hour" : "hours" }
        : parseFloat(minutes.toFixed(0)) !== 0
        ? { value: minutes, type: minutes === 1 ? "minute" : "minutes" }
        : { value: seconds, type: seconds === 1 ? "second" : "seconds" };

    // Return as an object
    return {
      recommended,
      seconds,
      minutes,
      hours,
      days,
    };
  }

  twelveHour(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // Remove full string match value
      time = time.slice(1);

      // Set AM/PM and adjust hours
      time[5] = +time[0] < 12 ? " AM" : " PM";
      time[0] = +time[0] % 12 || 12;
    }

    // Return adjusted time or original string
    return time.join("");
  }
}
