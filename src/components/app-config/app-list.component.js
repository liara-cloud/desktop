import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppPlatform from "./app-item.component";
import { AppListContainer, EmptyText, ProjectItem } from "./app-list.styles";
import { config } from "../../store/projectConfigSlice";

const AppListConfig = ({ currentApp, onClose, ...otherProps }) => {
  const projectConfig = useSelector(state => state.projectConfig);
  const dispatch = useDispatch();

  const handleSelectProject = (app, platform) => {
    dispatch(
      config({
        ...projectConfig,
        config: { ...projectConfig.config, app, platform }
      })
    );
    onClose();
  };

  const filteredProject = projectConfig.projects.filter(
    item => item.project_id !== currentApp
  );

  if (!filteredProject.length) {
    return (
      <AppListContainer {...otherProps}>
        <EmptyText>برنامه دیگری وجود ندارد</EmptyText>;
      </AppListContainer>
    );
  }

  return (
    <AppListContainer {...otherProps}>
      {filteredProject.map(({ project_id, type }) =>
        <ProjectItem
          key={project_id}
          onClick={() => handleSelectProject(project_id, type)}
        >
          <AppPlatform app={project_id} platform={type} />
        </ProjectItem>
      )}
    </AppListContainer>
  );
};

export default AppListConfig;
