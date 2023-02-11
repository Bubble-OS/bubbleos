const _mainArgs = () => {
  const args = process.argv;
  return args.splice(2);
};

module.exports = _mainArgs;
