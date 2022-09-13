import axios from "axios";

export const getProjects = (region, api_token) => {
  const isIran = region === "iran";

  const API = isIran
    ? `https://api.iran.liara.ir/v1/projects`
    : `https://api.liara.ir/v1/projects`;

  return axios.get(API, {
    headers: {
      Authorization: `Bearer ${api_token}`
    }
  });
};
