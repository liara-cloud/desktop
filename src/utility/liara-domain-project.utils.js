const liaraDomianProject = (region, app) => {
  if (region == "iran") return `https://${app}.iran.liara.run`;
  return `https://${app}.liara.run`;
};

export default liaraDomianProject;
