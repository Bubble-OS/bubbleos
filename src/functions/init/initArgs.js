const _detectArgs = require("../detectArgs");

const ConfigManager = require("../../classes/ConfigManager");
const InfoMessages = require("../../classes/InfoMessages");
const Verbose = require("../../classes/Verbose");

const { GLOBAL_NAME, EXPIRY_DATE } = require("../../variables/constants");

const config = new ConfigManager();

Verbose.custom("Displaying intro...");
if (!_detectArgs("intro")) require("./intro");

Verbose.custom("Completing timebomb disabler check...");
if (
  !_detectArgs("timebomb") &&
  !_detectArgs("warnings") &&
  EXPIRY_DATE.getTime() < new Date().getTime()
)
  InfoMessages.warning(
    `The timebomb has been disabled. The timebomb is a security feature to prevent you from using outdated software. Please upgrade to a new version of ${GLOBAL_NAME} as soon as possible.`
  );

// TODO Remove this when verbose mode is fully implemented
if (_detectArgs("verbose"))
  InfoMessages.info(
    `The verbose setting for ${GLOBAL_NAME} will be introduced in the next build. It is currently unused.`
  );

Verbose.custom("Completing fatal error file dump check...");
if (_detectArgs("dump") && !_detectArgs("warnings"))
  InfoMessages.warning("The fatal error file dump feature has been disabled.");

if (_detectArgs("reset")) {
  if (config.deleteConfig()) {
    InfoMessages.success(`Successfully deleted the ${GLOBAL_NAME} configuration file.`);
  } else {
    InfoMessages.error(
      `An unexpected error occurred while trying to delete the ${GLOBAL_NAME} configuration file.`
    );
  }
}

if (!config.createConfig())
  InfoMessages.error(
    `${GLOBAL_NAME} failed to create the configuration file. Some features will not work.`
  );
