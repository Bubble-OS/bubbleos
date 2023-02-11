const _mainArgs = () => {
  const args = process.argv;
  return args.splice(2);
};

export default _mainArgs;
