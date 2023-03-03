// Get modules
const chalk = require("chalk");

// Get variables
const { GLOBAL_NAME } = require("../variables/constants");

/**
 * A class which does **not** require initialization (`new Errors`). Contains all errors used in BubbleOS.
 *
 * Note that you can edit the error messages, but only in the class itself, and the changes will reflect across BubbleOS.
 * Each function inside the class has a `CODE` and `MESSAGE` variable. The `CODE` must be of a `number`, while the `MESSAGE` must be a `string`.
 *
 * For example:
 *
 * ```js
 * const Errors = require("./path/to/Errors.js");
 *
 * // Note that it will always 'console.log' to the stdout
 * Errors.enterCommand();
 * ```
 *
 * Call by using `Errors.yourErrorFunc(params)`. More information on each function below with their respective error code.
 *
 * - `0` - `enterCommand()`
 * - `1` - `unrecognizedCommand()`
 * - `2` - `enterParameter()`
 * - `3` - `doesNotExist()`
 * - `4` - `noPermissions()`
 * - `5` - `inUse()`
 * - `6` - `alreadyExists()`
 * - `7` - `expectedFile()`
 * - `8` - `expectedDir()`
 * - `9` - `invalidOS()`
 * - `10` - `invalidEncoding()`
 * - `11` - `invalidExtension()`
 * - `12` - `invalidCharacters()`
 * - `13` - `pathTooLong()`
 * - `14` - `dirToNonDir()`
 * - `15` - `unknown()`
 */
class Errors {
  constructor() {}

  /**
   * A **private** method inside of the `Errors` class to interpret an error and format the error code and message.
   *
   * Editing the contents of this will reflect across all error messages throughout BubbleOS.
   *
   * Note that the message will be formatted with Chalk and does `console.log` it.
   *
   * Usage (inside):
   *
   * ```js
   * // For example, inside of a function in 'Errors'
   * this.#interpretError(CODE, MESSAGE);
   * ```
   *
   * The `code` must be of type `number`, and the `message` must be of type `string`. However, there are no checks in place for this validation.
   *
   * @param {number | string} code The error code that should be in the error.
   * @param {string} message The error message that should be in the error.
   */
  static #interpretError(code, message) {
    const FORMATTED_MESSAGE = chalk.red(`${chalk.bold(`[${String(code)}]`)} ${message}\n`);
    console.log(FORMATTED_MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _Enter command_
   *
   * **Parameters:** _(none)_
   *
   * **Error code:** `0`
   *
   * **Message:** Please enter a command. Type _'help'_ for a list of available commands.
   */
  static enterCommand() {
    const CODE = 0;
    const MESSAGE = `Please enter a command. Type ${chalk.italic(
      "'help'"
    )} for a list of available commands.`;

    this.#interpretError(CODE, MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _Unrecognized command_
   *
   * **Parameters:** `command`
   *
   * **Error code:** `1`
   *
   * **Message:** The command, **_`command`_**, is unrecognized. Type _'help'_ for a list of available commands.
   *
   * @param {string} command The command that the user entered.
   */
  static unrecognizedCommand(command) {
    const CODE = 1;
    const MESSAGE = `The command, ${chalk.italic.bold(
      `'${command}'`
    )}, is unrecognized. Type ${chalk.italic("'help'")} for a list of available commands.`;

    this.#interpretError(CODE, MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _Enter parameter_
   *
   * **Parameters:** `type`, `example`
   *
   * **Error code:** `2`
   *
   * **Message:** You must enter `type`, for example, like so: **_'`example`'_**
   *
   * @param {string} type The type of data the user should enter. For example: _a directory_, or, _the files_.
   * @param {string} example An example of what the user should enter.
   */
  static enterParameter(type, example) {
    const CODE = 2;
    const MESSAGE = `You must enter ${type}, for example, like so: ${chalk.italic.bold(
      `'${example}'`
    )}. ${chalk.dim("(NO_PARAMS_ENTERED)")}`;

    this.#interpretError(CODE, MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _Does not exist / Non-existant_
   *
   * **Parameters:** `type`, `variable`
   *
   * **Error code:** `3`
   *
   * **Message:** The `type`, **_'`variable`'_**, does not exist. (ENOENT)
   *
   * @param {string} type The type of thing that does not exist. For example: _directory_, or, _file_.
   * @param {string} variable The value that the user entered.
   */
  static doesNotExist(type, variable) {
    const CODE = 3;
    const MESSAGE = `The ${type}, ${chalk.italic.bold(
      `'${variable}'`
    )}, does not exist. ${chalk.dim("(NON_EXISTANT)")}`;

    this.#interpretError(CODE, MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _No permissions_
   *
   * **Parameters:** `todo`, `variable`
   *
   * **Error code:** `4`
   *
   * **Message:** Invalid permissions to `todo` **_'`variable`'_**. You need elevated privileges. (EPERM)
   *
   * @param {string} todo The thing that the user was attempting to do (e.g. _read the file_).
   * @param {string} variable The value that the user entered.
   */
  static noPermissions(todo, variable) {
    const CODE = 4;
    const MESSAGE = `Invalid permissions to ${todo} ${chalk.italic.bold(
      `'${variable}'`
    )}. You need elevated privileges. ${chalk.dim("(INVALID_PERMS)")}`;

    this.#interpretError(CODE, MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _In use_
   *
   * **Parameters:** `type`, `variable`
   *
   * **Error code:** `5`
   *
   * **Message:** The `type`, **_'`variable`'_**, is currently being used. (EBUSY)
   *
   * @param {string} type The type of thing that is in use. For example: _directory_, or, _file_.
   * @param {string} variable The value that the user entered.
   */
  static inUse(type, variable) {
    const CODE = 5;
    const MESSAGE = `The ${type}, ${chalk.bold.italic(
      `'${variable}'`
    )}, is currently being used. ${chalk.dim("(PATH_BUSY)")}`;

    this.#interpretError(CODE, MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _Already exists_
   *
   * **Parameters:** `type`, `variable`
   *
   * **Error code:** `6`
   *
   * **Message:** The `type`, **_'`variable`'_**, already exists. (EEXIST)
   *
   * @param {string} type The type of thing that already exists. For example: _directory_, or, _file_.
   * @param {string} variable The value that the user entered.
   */
  static alreadyExists(type, variable) {
    const CODE = 6;
    const MESSAGE = `The ${type}, ${chalk.bold.italic(
      `'${variable}'`
    )}, already exists. ${chalk.dim("(PATH_EXISTS)")}`;

    this.#interpretError(CODE, MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _Expected file_
   *
   * **Parameters:** `variable`
   *
   * **Error code:** `7`
   *
   * **Message:** Expected a file, but got a directory (**_'`variable`'_**) instead. (EISDIR)
   *
   * @param {string} variable The value that the user entered.
   */
  static expectedFile(variable) {
    const CODE = 7;
    const MESSAGE = `Expected a file, but got a directory (${chalk.bold.italic(
      `'${variable}'`
    )}) instead. ${chalk.dim("(PATH_IS_DIR)")}`;

    this.#interpretError(CODE, MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _Expected directory_
   *
   * **Parameters:** `variable`
   *
   * **Error code:** `8`
   *
   * **Message:** Expected a directory, but got a file (**_'`variable`'_**) instead. (ENOTDIR)
   *
   * @param {string} variable The value that the user entered.
   */
  static expectedDir(variable) {
    const CODE = 8;
    const MESSAGE = `Expected a directory, but got a file (${chalk.bold.italic(
      `'${variable}'`
    )}) instead. ${chalk.dim("(PATH_IS_NOT_DIR)")}`;

    this.#interpretError(CODE, MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _Invalid OS_
   *
   * **Parameters:** `os`
   *
   * **Error code:** `9`
   *
   * **Message:** This command can only run on `os`.
   *
   * @param {string} os The operating system that the command can run on.
   */
  static invalidOS(os) {
    const CODE = 9;
    const MESSAGE = `This command can only run on ${os}. ${chalk.dim("(INVALID_OS)")}`;

    this.#interpretError(CODE, MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _Invalid encoding_
   *
   * **Parameters:** `encoding`
   *
   * **Error code:** `10`
   *
   * **Message:** This command can only read `encoding` files.
   *
   * @param {string} encoding The encoding that the command can read.
   */
  static invalidEncoding(encoding) {
    const CODE = 10;
    const MESSAGE = `This command can only read ${encoding} files. ${chalk.dim(
      "(INVALID_ENCODING)"
    )}`;

    this.#interpretError(CODE, MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _Invalid extension_
   *
   * **Parameters:** `extension`
   *
   * **Error code:** `11`
   *
   * **Message:** Only files ending with the **_'`extension`'_** extension can be used.
   *
   * @param {string} extension The extension that was expected.
   */
  static invalidExtension(extension) {
    const CODE = 11;
    const MESSAGE = `Only files ending with the ${chalk.italic.bold(
      `'${extension}'`
    )} extension can be used. ${chalk.dim("(INVALID_EXTENTION)")}`;

    this.#interpretError(CODE, MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _Invalid characters_
   *
   * **Parameters:** `type`, `supposedTo`, `notContain`, `variable`
   *
   * **Error code:** `12`
   *
   * **Message:** The `type` can only contain `supposedTo` and not contain `notContain` (received **_'`variable`'_**).
   *
   * @param {string} type The type of thing that was validated (e.g. _file name_).
   * @param {string} supposedTo The characters that the item **can** contain.
   * @param {string} notContain The characters that the item **cannot** contain.
   * @param {string} variable The variable passed from the user.
   */
  static invalidCharacters(type, supposedTo, notContain, variable) {
    const CODE = 12;
    const MESSAGE = `The ${type} can only contain ${supposedTo} and not contain ${notContain} (received ${chalk.bold.italic(
      `'${variable}'`
    )}). ${chalk.dim("(INVALID_CHARS)")}`;

    this.#interpretError(CODE, MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _Path too long_
   *
   * **Parameters:** `path`
   *
   * **Error code:** `13`
   *
   * **Message:** The path (**_'`path`'_**) is too long. Please choose a shorter path.
   *
   * @param {string} path The path that the user entered.
   */
  static pathTooLong(path) {
    const CODE = 13;
    const MESSAGE = `The path (${chalk.bold.italic(
      `'${path}'`
    )}) is too long. Please choose a shorter path. ${chalk.dim("(PATH_TOO_LONG)")}`;

    this.#interpretError(CODE, MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _Directory to non-directory_
   *
   * **Parameters:** `dir`, `nonDir`
   *
   * **Error code:** `14`
   *
   * **Message:** Cannot overwrite the directory (**_'`path`'_**) with a non-directory (**_'`path`'_**). (COPY_DIR_TO_NON_DIR)
   *
   * @param {string} dir The directory that the user entered.
   * @param {string} nonDir The non-directory that the user entered.
   */
  static dirToNonDir(dir, nonDir) {
    const CODE = 14;
    const MESSAGE = `Cannot overwrite the directory (${chalk.bold.italic(
      `'${dir}'`
    )}) with a non-directory (${chalk.bold.italic(`'${nonDir}'`)}). ${chalk.dim(
      "(COPY_DIR_TO_NON_DIR)"
    )}`;

    this.#interpretError(CODE, MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _Unknown action_
   *
   * **Parameters:** `toDo`, `variable`
   *
   * **Error code:** `15`
   *
   * **Message:** _%GLOBAL_NAME%_ does not know how to `toDo` **_'`variable`'_**. (UNKNOWN)
   *
   * @param {string} toDo The action that was unknown.
   * @param {string} variable The variable that the user entered.
   */
  static unknown(toDo, variable) {
    const CODE = 15;
    const MESSAGE = `${GLOBAL_NAME} does not know how to ${toDo} ${chalk.bold.italic(
      `'${variable}'`
    )}. ${chalk.dim("(UNKNOWN)")}`;

    this.#interpretError(CODE, MESSAGE);
  }
}

module.exports = Errors;
