const chalk = require("chalk");
const https = require("https");

const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");

const HTTP_CODES_AND_MESSAGES = {
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  207: "Multi-Status (WebDAV)",
  208: "Already Reported (WebDAV)",
  226: "IM Used",
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  306: "(Unused)",
  307: "Temporary Redirect",
  308: "Permanent Redirect (experimental)",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Request Entity Too Large",
  414: "Request-URI Too Long",
  415: "Unsupported Media Type",
  416: "Requested Range Not Satisfiable",
  417: "Expectation Failed",
  418: "I'm a teapot (RFC 2324)",
  420: "Enhance Your Calm (Twitter)",
  422: "Unprocessable Entity (WebDAV)",
  423: "Locked (WebDAV)",
  424: "Failed Dependency (WebDAV)",
  425: "Reserved for WebDAV",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  444: "No Response (Nginx)",
  449: "Retry With (Microsoft)",
  450: "Blocked by Windows Parental Controls (Microsoft)",
  451: "Unavailable For Legal Reasons",
  499: "Client Closed Request (Nginx)",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates (Experimental)",
  507: "Insufficient Storage (WebDAV)",
  508: "Loop Detected (WebDAV)",
  509: "Bandwidth Limit Exceeded (Apache)",
  510: "Not Extended",
  511: "Network Authentication Required",
  598: "Network read timeout error",
  599: "Network connect timeout error",
};

const _makeConnection = async (host, path = "") => {
  const options = {
    host,
    path,
    timeout: 5000,
    method: "HEAD",
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
            )}, is responding with status code ${res.statusCode} (${HTTP_CODES_AND_MESSAGES[
              res.statusCode
            ].toLowerCase()}).\n`
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
    }
  }
};

module.exports = ping;
