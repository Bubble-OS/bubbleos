const chalk = require("chalk");
const emptyTrash = require("empty-trash");

const _promptForYN = require("../functions/promptForYN");
const _fatalError = require("../functions/fatalError");

const Errors = require("../classes/Errors");

const empty = async (...args) => {
  try {
  } catch (err) {
    _fatalError(err);
  }
};

module.exports = empty;
