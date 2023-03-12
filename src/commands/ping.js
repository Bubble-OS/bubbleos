const chalk = require("chalk");
const https = require("https");

const _makeConnection = async (host, path = "", timeout = 2000, method = "HEAD") => {
  const options = {
    host,
    path,
    timeout,
    method,
    followRedirect: true,
  };

  return new Promise((resolve, reject) => {
    console.log(chalk.blue("Please wait..."));

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

    req.on("error", (err) => {
      reject(err);
    });

    req.on("timeout", () => {
      reject(
        chalk.red(`The server, ${chalk.bold.italic(options.host + options.path)}, has timed out.\n`)
      );
    });

    req.end();
  });
};

const ping = async (host, path) => {
  try {
    const result = await _makeConnection(host, path);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

module.exports = ping;
