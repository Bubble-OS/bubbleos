const chalk = require("chalk");
const fs = require("fs");
const crypto = require("crypto");
const { question } = require("readline-sync");

const _parseDoubleQuotes = require("../functions/parseQuotes");
const _convertAbsolute = require("../functions/convAbs");
const _fatalError = require("../functions/fatalError");

const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");

const AVAILABLE_HASHES = [
  "md5",
  "sha1",
  "sha224",
  "sha256",
  "sha384",
  "sha512",
  "sha3-224",
  "sha3-256",
  "sha3-384",
  "sha3-512",
  "shake128",
  "shake256",
];

const logHash = (hashAlgo, contents) => {
  console.log(
    `${chalk.green(hashAlgo.toUpperCase() + ":")} ${crypto
      .createHash(hashAlgo.toLowerCase())
      .update(contents)
      .digest("hex")}`
  );
};

const hash = (file, ...args) => {
  try {
    file = _convertAbsolute(_parseDoubleQuotes([file, ...args])[0]);

    const fileChk = new Checks(file);

    if (fileChk.paramUndefined()) {
      Errors.enterParameter("a file", "hash test.txt");
      return;
    }

    if (!fileChk.doesExist()) {
      Errors.doesNotExist("file", file);
      return;
    } else if (fileChk.validateType()) {
      Errors.expectedFile(file);
      return;
    }

    const requested = question(
      `Enter the file hashes to be shown (${chalk.italic("'Enter'")} to accept; ${chalk.italic(
        "'all'"
      )} for all hashes; insert space to add multiple): `
    ).split(" ");
    const contents = fs.readFileSync(file, { encoding: "utf-8", flag: "r" });

    const all = requested.length === 1 && requested[0].toLowerCase() === "all";

    console.log();

    if (requested[0] === "") {
      console.log(
        chalk.yellow(
          `No hashes were entered. Try entering hashes into the prompt before entering.\nProcess aborted.\n`
        )
      );
      return;
    }

    if (all) {
      AVAILABLE_HASHES.forEach((hashAlgo) => {
        logHash(hashAlgo, contents);
      });
    } else {
      requested.forEach((hashAlgo) => {
        if (!AVAILABLE_HASHES.includes(hashAlgo))
          console.log(chalk.yellow(`Unrecognized hash: ${chalk.italic(hashAlgo)}`));
        else logHash(hashAlgo, contents);
      });
    }

    console.log();
  } catch (err) {
    if (err.code === "EPERM") {
      Errors.noPermissions("read the file", file);
      return;
    } else if (err.code === "EBUSY") {
      Errors.inUse("file", file);
      return;
    } else {
      _fatalError(err);
    }
  }
};

module.exports = hash;
