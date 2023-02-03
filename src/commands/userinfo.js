const chalk = require("chalk");
const { userInfo } = require("os");

const _fatalError = require("../functions/fatalError");

/**
 * Get user information. Renamed to not cause issues with naming conventions.
 */
const userinfocmd = () => {
  try {
    const { gid, homedir, shell, uid, username } = userInfo();

    // If the OS is Windows, GID, Shell, and UID are -1/null. So this is only shown to operating systems other than Windows.
    if (process.platform !== "win32") {
      console.log(`GID (group identifier): ${chalk.bold(gid)}`);
      console.log(`Shell: ${chalk.bold(shell)}`);
      console.log(`UID (user identifier): ${chalk.bold(uid)}`);
    }

    console.log(`Home directory: ${chalk.bold(homedir)}`);
    console.log(`Username: ${chalk.bold(username)}\n`);
  } catch (err) {
    _fatalError(err);
  }
};

module.exports = userinfocmd;
