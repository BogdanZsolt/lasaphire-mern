const textShortener = (text, length = 200) => {
  text = text.length > length ? text.substring(0, length) : text;
  text =
    text.length === length
      ? `${text.substring(0, Math.min(text.length, text.lastIndexOf(' ')))}...`
      : text;
  return text;
};

export { textShortener };
