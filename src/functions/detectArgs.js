const args = process.argv.splice(2);
const arguments = {
  help: ["-h", "--help"],
  version: ["-v", "--version"],
  timebomb: ["--no-timebomb"],
  checks: ["--no-checks"],
  warnings: ["--no-timebomb"],
  intro: ["--no-intro"],
  dump: ["--no-dump"],
  reset: ["--reset"],
  verbose: ["--verbose"],
};

/**
 * Detects if the specified argument was passed into BubbleOS.
 *
 * @param {"help" | "version" | "timebomb" | "checks" | "warnings" | "intro" | "dump" | "reset" | "verbose"} argument The name of the argument defined in the `arguments` object.
 * @returns `false` if the argument was not passed into BubbleOS, `true` if it was.
 */
const _detectArgs = (argument) => {
  if (!arguments[argument]) {
    // Return false if the argument key is not defined in the arguments object
    return false;
  }

  return args.some((arg) => arguments[argument].includes(arg));
};

module.exports = _detectArgs;
