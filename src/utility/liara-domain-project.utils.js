const liaraDomianProject = (network, app) => {
  if (network) return `https://${app}.liara.run`;
  return `https://${app}.iran.liara.run`;
};

export default liaraDomianProject;
