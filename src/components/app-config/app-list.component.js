import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppPlatform from "./app-item.component";
import { AppListContainer, EmptyText, ProjectItem } from "./app-list.styles";
import { config } from "../../store/projectConfigSlice";

const AppListConfig = ({ currentApp, onClose, ...otherProps }) => {
  const { projectConfig, projects } = useSelector(state => state);
  const dispatch = useDispatch();

  const handleSelectProject = ({app, platform, network }) => {
    dispatch(
      config({
        ...projectConfig,
        config: { ...projectConfig.config, app, platform, network }
      })
    );
    onClose();
  };

  const filteredProject = projects.data.filter(
    item => item.project_id !== currentApp
  );

  if (!filteredProject.length) {
    return (
      <AppListContainer {...otherProps}>
        <EmptyText>برنامه دیگری وجود ندارد</EmptyText>
      </AppListContainer>
    );
  }


  return (
    <AppListContainer {...otherProps}>
      {filteredProject.map(({ project_id, type, network }) =>
        <ProjectItem
          key={project_id}
          onClick={() => handleSelectProject({ app: project_id, platform: type, network: network?._id })}
        >
          <AppPlatform app={project_id} platform={type} />
        </ProjectItem>
      )}
    </AppListContainer>
  );
};

export default AppListConfig;
