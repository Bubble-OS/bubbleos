const chalk = require("chalk");
const psList = require("ps-list");
const sortKeys = require("sort-keys");

const tasklist = async (num) => {
  console.log(
    chalk.red.dim(
      "WARNING! This command is still in development. Report all bugs to https://github.com/Bubble-OS/bubbleos/issues."
    )
  );

  let numberToDisplay = Number(num);
  const taskList = await psList();

  const keysUpdated = sortKeys(
    JSON.parse(
      JSON.stringify(taskList)
        .replace(/pid/gi, "PID")
        .replace(/ppid/gi, "PPID")
        .replace(/name/gi, "Name")
        .replace(/cmd/gi, "CMD")
        .replace(/cpu/gi, "CPU")
        .replace(/memory/gi, "Memory")
        .replace(/uid/gi, "UID")
    ),
    { deep: true }
  );

  if (taskList.length < numberToDisplay) numberToDisplay = taskList.length;
  if (isNaN(numberToDisplay)) numberToDisplay = taskList.length;
  if (numberToDisplay <= 0) numberToDisplay = 1;

  const printTable = () => {
    let arr = [];
    for (let i = 0; i < numberToDisplay; i++) {
      arr.push(keysUpdated[i]);
    }
    console.table(arr);
  };
  printTable();
};

module.exports = tasklist;
