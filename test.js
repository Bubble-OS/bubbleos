const _parseDoubleQuotes = (arr) => {
  const str = arr?.join(" ");
  const regex = /"([^"]*)"(?:[^"]*"([^"]*)")?/;
  const matches = str?.match(regex);

  if (str?.trim() === "") return undefined;

  if (matches && matches.length === 3) {
    const quotesText = matches.filter(Boolean);
    quotesText.shift();

    return quotesText;
  } else {
    return str?.split(" ");
  }
};

console.log(_parseDoubleQuotes(undefined));
