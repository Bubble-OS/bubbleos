const _multiParam = (command) => {
  const params = command.split(" ");

  params.shift();
  return params;
};

module.exports = _multiParam;
