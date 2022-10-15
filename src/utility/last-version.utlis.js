import axios from "axios";
import yaml from "js-yaml";

const getLastVersion = async os => {
  const res = await axios.get("https://desktop.liara.ir/releases/latest.yml");
  const { version } = yaml.load(res.data);
  return version;
};

export default getLastVersion;
