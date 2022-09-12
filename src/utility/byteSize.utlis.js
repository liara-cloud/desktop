import _byteSize from "byte-size";

const byteSize = (val) => {
  const data = _byteSize(val);
  return `${data.value} ${data.unit}`;
};

export default byteSize;
