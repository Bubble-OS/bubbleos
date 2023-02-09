const _singleParam = (command, commandName) =>
  command.replace(`${commandName} `, "").startsWith(commandName)
    ? undefined
    : command.replace(`${commandName} `, "");

export default _singleParam;
