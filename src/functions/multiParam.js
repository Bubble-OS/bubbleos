const _multiParam = (command, limit = undefined) => {
  let params = undefined;
  if (typeof limit !== "undefined") params = command.split(" ", limit);
  else params = command.split(" ");

  params.shift();
  return params;
};

export default _multiParam;
