const _parseDoubleQuotes = (arr) => {
  const str = arr.join(" ");
  const regex = /"([^"]*)"(?:[^"]*"([^"]*)")?/;
  const matches = str.match(regex);

  if (matches && matches.length === 3) {
    const quotesText = matches.filter(Boolean);
    return quotesText[1];
  } else {
    return str.split(" ")[0];
  }
};

console.log(_parseDoubleQuotes([`"Documents and Settings"`, "-s"]));
