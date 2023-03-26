const fs = require("fs");
const os = require("os");
const path = require("path");

const { GLOBAL_NAME } = require("../variables/constants");

const Checks = require("../classes/Checks");

/**
 * Manage the main configuration file of BubbleOS.
 *
 * The `whatShouldIDo` parameter defines what this
 * function should do. The available values are:
 * - `'create'` - Creates the configuration file.
 * - `'delete'` - Delete the entire configuration file.
 * - `'get'` - Get the contents of the configuration file in both raw and parsed format.
 * - `'add'` - Add a value to the configuration file. Overwrites it.
 *
 * @param {string} whatShouldIDo One of the above values.
 * @param {object} data An object structure that will be converted to JSON. Only needed if `whatShouldIDo` is `'add'`.
 * @returns Either data, `true` if the operation was successful, or `false` if it was unsuccessful.
 */
const _manageConfig = (whatShouldIDo, data) => {
  whatShouldIDo = whatShouldIDo.toLowerCase();

  const configName = `${GLOBAL_NAME}-config.json`.toLowerCase();
  const homedir = os.homedir();
  const configPath = path.join(homedir, configName);

  const configChk = new Checks(configPath);

  if (whatShouldIDo === "create") {
    try {
      if (!configChk.doesExist()) {
        fs.writeFileSync(configPath, "{}");
      }

      return true;
    } catch (_) {
      return false;
    }
  } else if (whatShouldIDo === "delete") {
    try {
      fs.rmSync(configPath, { recursive: true, force: true });
      return true;
    } catch (_) {
      return false;
    }
  } else if (whatShouldIDo === "get") {
    try {
      const contents = fs.readFileSync(configPath, { flag: "r", encoding: "utf8" });
      return {
        raw: contents,
        parsed: JSON.parse(contents),
      };
    } catch (_) {
      return false;
    }
  } else if (whatShouldIDo === "add") {
    const contents = JSON.parse(fs.readFileSync(configPath, { flag: "r", encoding: "utf8" }));

    for (const param in data) {
      if (Array.isArray(contents[param])) contents[param] = contents[param].concat(data[param]);
      else contents[param] = data[param];
    }

    for (const parse in contents) {
      if (typeof data[parse] === "undefined") data[parse] = contents[parse];
    }

    try {
      fs.writeFileSync(configPath, JSON.stringify(data));
      return true;
    } catch (_) {
      return false;
    }
  } else return false;
};

module.exports = _manageConfig;
