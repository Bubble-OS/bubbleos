const isElevated = require("is-elevated");

const _detectArgs = require("../detectArgs");

const InfoMessages = require("../../classes/InfoMessages");

const checkElevation = async () => {
  if ((await isElevated()) && !_detectArgs("warnings"))
    InfoMessages.warning(
      `${GLOBAL_NAME} is running with elevated privileges. Use commands with caution.`
    );
};

module.exports = checkElevation;
