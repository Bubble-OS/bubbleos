const _convertSize = (bytes, decimals = 3) => {
  const kilobytes = parseFloat((bytes / 1000).toFixed(decimals));
  const megabytes = parseFloat((kilobytes / 1000).toFixed(decimals));
  const gigabytes = parseFloat((megabytes / 1000).toFixed(decimals));

  return {
    Bytes: bytes,
    Kilobytes: kilobytes,
    Megabytes: megabytes,
    Gigabytes: gigabytes,
  };
};

export default _convertSize;
