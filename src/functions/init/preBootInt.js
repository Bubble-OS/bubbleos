const _intCmds = require("../interpret");

const Verbose = require("../../classes/Verbose");

const _preBootInterpreter = () => {
  const args = process.argv.splice(2);

  if (args.length !== 0) {
    Verbose.custom("Detecting if the pre-boot interpreter was invoked...");
    let command = args.filter((val) => {
      if (val.startsWith("-")) return false;
      return true;
    });

    if (command.length !== 0) {
      Verbose.custom("Running the command given to the pre-boot interpreter...");

      (async () => {
        await _intCmds(command.join(" "));
      })();

      return;
    }
  }
};

module.exports = _preBootInterpreter;
