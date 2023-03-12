const chalk = require("chalk");
const https = require("https");

const { Errors } = require("../classes/Errors");
const Checks = require("../classes/Checks");

const _makeConnection = async (host, path = "", timeout = 5000, method = "HEAD") => {
  const options = {
    host,
    path,
    timeout,
    method,
    followRedirect: true,
    rejectUnauthorized: false,
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      if (res.statusCode === 200) {
        resolve(
          chalk.green(
            `The server, ${chalk.bold.italic(
              options.host + options.path
            )}, is responding with status code 200 (success)!\n`
          )
        );
      } else {
        reject(
          chalk.red(
            `The server, ${chalk.bold.italic(
              options.host + options.path
            )}, is responding with status code ${res.statusCode} (fail)!\n`
          )
        );
      }
    });

    req.on("error", reject);

    req.on("timeout", () => {
      reject(
        chalk.red(`The server, ${chalk.bold.italic(options.host + options.path)}, has timed out.\n`)
      );
    });

    req.end();
  });
};

const ping = async (host, ...args) => {
  try {
    if (new Checks(host).paramUndefined()) {
      Errors.enterParameter("a host", "ping www.google.com");
      return;
    }

    const split = host.split("/");
    const hostname = split.splice(0, 1);
    const path = split.length !== 0 ? "/" + split.join("/") : "";

    const result = await _makeConnection(hostname[0], path);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

module.exports = ping;
