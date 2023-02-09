const _prepVerbose = (commands) => {
  let verbose = false;
  let arg = "";

  if (commands[commands.length - 1] === "--verbose") {
    commands.pop();
    verbose = true;
  } else {
    verbose = false;
  }

  arg = commands.join(" ");
  return [arg, verbose];
};

export default _prepVerbose;
