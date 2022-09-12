import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppPlatform from "./app-item.component";
import { AppListContainer, ProjectItem } from "./app-list.styles";
import { config } from "../../store/projectConfigSlice";

const AppListConfig = ({ ...otherProps }) => {
  const projectConfig = useSelector((state) => state.projectConfig);
  const dispatch = useDispatch();

  const handleSelectProject = (app, platform) => {
    dispatch(
      config({
        ...projectConfig,
        config: { ...projectConfig.config, app, platform }
      })
    );
  };

  return (
    <AppListContainer {...otherProps}>
      {projectConfig.projects.map(({ project_id, type }) => (
        <ProjectItem
          key={project_id}
          onClick={() => handleSelectProject(project_id, type)}
        >
          <AppPlatform app={project_id} platform={type} />
        </ProjectItem>
      ))}
    </AppListContainer>
  );
};

export default AppListConfig;
