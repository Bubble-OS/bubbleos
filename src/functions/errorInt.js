const { red: chalkRed, bold: chalkBold } = require("chalk");

const errors = require("../../variables/constants").ERRORS;

const _errorInterpret = (errorCode, newLine = true) => {
  if (typeof errors[errorCode] === "undefined") {
    throw new Error(
      "The error code provided is invalid. Make sure you have added it in constants.js."
    );
  }

  console.log(
    chalkRed(`${chalkBold(`Error code ${errorCode}:`)} ${errors[errorCode]}${newLine ? "\n" : ""}`)
  );
};

module.exports = _errorInterpret;
