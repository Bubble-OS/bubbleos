const cls = () => {
  try {
    process.stdout.write("\033c");
  } catch (err) {
    _fatalError(err);
  }
};

module.exports = cls;
