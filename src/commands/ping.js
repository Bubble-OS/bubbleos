const chalk = require("chalk");
const https = require("https");

const HTTP_CODES_AND_MESSAGES = require("../data/httpCodes.json");

const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");

const _makeConnection = async (host, path = "", maxRedirects = 5) => {
  const options = {
    host,
    path,
    timeout: 5000,
    method: "HEAD", // HEAD request to only fetch headers
    rejectUnauthorized: false, // Disable SSL verification (not recommended for production)
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      if ([301, 302, 307, 308].includes(res.statusCode)) {
        const location = res.headers.location;
        if (location) {
          if (maxRedirects > 0) {
            // Debug statement, uncomment if needed to debug issues:
            // console.log(
            //   chalk.yellow(`Redirected to: ${chalk.bold(location)}. Following the redirect...\n`)
            // );

            // Parse the new URL and recursively call _makeConnection
            const url = new URL(
              location.startsWith("http") ? location : `https://${host}${location}`
            );
            _makeConnection(url.hostname, url.pathname + url.search, maxRedirects - 1)
              .then(resolve)
              .catch(reject);
          } else {
            reject(
              chalk.red(
                `Too many redirects. Stopped following after ${5 - maxRedirects} redirects.\n`
              )
            );
          }
        } else {
          reject(
            chalk.red(
              `Redirect received, but no Location header found. Status code: ${res.statusCode}\n`
            )
          );
        }
      } else if (res.statusCode === 200) {
        resolve(
          chalk.green(
            `The server, ${chalk.bold.italic(
              (options.host + options.path).replace(/^www\.|\/+$/g, "")
            )}, is responding with status code 200 (OK)!\n`
          )
        );
      } else {
        reject(
          chalk.red(
            `The server, ${chalk.bold.italic(
              options.host + options.path
            )}, responded with status code ${res.statusCode} (${
              HTTP_CODES_AND_MESSAGES[res.statusCode] ?? "N/A"
            }).\n`
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
    if (err.code === "ENOTFOUND") {
      console.log(chalk.red("The address could not be located.\n"));
      return;
    } else {
      console.log(err);
      return;
    }
  }
};

module.exports = ping;
