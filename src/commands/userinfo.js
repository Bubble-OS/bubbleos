// Get modules
const os = require("os");
const chalk = require("chalk");

// Get functions
const _fatalError = require("../functions/fatalError");

/**
 * Get user information, for use in the BubbleOS
 * CLI Shell.
 *
 * Usage:
 *
 * ```js
 * userinfo(); // No arguments are currently accepted
 * ```
 *
 * Get the following properties from the `os.userInfo`
 * function:
 * - GID (group identifier) **[n/a on Windows]**
 * - UID (user identifier) **[n/a on Windows]**
 * - Shell **[n/a on Windows]**
 * - Username
 * - Home directory
 * - Temporary directory
 *
 * The function will check if the OS is not Windows before
 * continuing to show the properties not available on Windows,
 * as on Windows, it will show as `-1` and `null`,
 * respectively.
 *
 * No arguments are currently accepted, nor any filter ones.
 *
 * @param {...string} args The arguments to change the behaviour of `userinfo`, however, there are none currently.
 */
const userinfo = (...args) => {
  try {
    // Get all properties from userInfo()
    const { gid, homedir, shell, uid, username } = os.userInfo();

    // If the OS is Windows, GID, shell and UID are -1/null; so this is only shown to operating systems other than Windows
    if (process.platform !== "win32") {
      console.log(`GID (group identifier): ${chalk.bold(gid)}`);
      console.log(`UID (user identifier): ${chalk.bold(uid)}`);
      console.log(`Shell: ${chalk.bold(shell)}`);

      // Newline
      console.log();
    }

    // Log more information present in majority of OSes
    console.log(`Username: ${chalk.bold(username)}`);
    console.log(`Home directory: ${chalk.bold(homedir)}`);
    console.log(`Temporary directory: ${chalk.bold(os.tmpdir())}`);

    // Newline and return
    console.log();
    return;
  } catch (err) {
    // Unknown error
    _fatalError(err);
  }
};

// Export the function
module.exports = userinfo;
