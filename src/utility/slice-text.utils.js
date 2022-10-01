const sliceText = (text, amount) => {
  return text.length >= amount ? text.slice(0, amount) + "..." : text;
};

export default sliceText;
