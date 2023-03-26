// const fs = require("fs");
// const os = require("os");
// const path = require("path");

// const configName = `bubbleos-config.json`.toLowerCase();
// const homedir = os.homedir();

// const configPath = path.join(homedir, configName);

// console.log(configPath);

const test = `{ "history": ["f", "e", "g", "d"], "else": 5 }`;
const parsed = JSON.parse(test);

const params = { history: ["a", "b", "c"], something: 2 };

for (const param in params) {
  if (Array.isArray(parsed[param])) parsed[param].push(...params[param]);
  else parsed[param] = params[param];
}

for (const parse in parsed) {
  if (typeof params[parse] === "undefined") params[parse] = parsed[parse];
}

console.log(params);
