const cutString = (string, length) =>
  string.length < length ? string : string.slice(0, length) + '...';

export default cutString;
