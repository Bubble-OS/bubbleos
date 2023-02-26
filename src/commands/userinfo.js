const os = require("os");

const chalk = require("chalk");

const _fatalError = require("../functions/fatalError");

/**
 * Get user information. Renamed to not cause issues with naming conventions.
 */
const userinfo = () => {
  try {
    const { gid, homedir, shell, uid, username } = os.userInfo();

    // If the OS is Windows, GID, Shell, and UID are -1/null. So this is only shown to operating systems other than Windows.
    if (process.platform !== "win32") {
      console.log(`GID (group identifier): ${chalk.bold(gid)}`);
      console.log(`UID (user identifier): ${chalk.bold(uid)}`);
      console.log(`Shell: ${chalk.bold(shell)}\n`);
    }

    console.log(`Username: ${chalk.bold(username)}`);
    console.log(`Home directory: ${chalk.bold(homedir)}`);
    console.log(`Temporary directory: ${chalk.bold(os.tmpdir())}`);

    console.log();
  } catch (err) {
    _fatalError(err);
  }
};

module.exports = userinfo;
