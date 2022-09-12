import React, { useState } from "react";
import {
  AppConfigContainer,
  RefetchContainer,
  RefetchIcon,
  SelectAppContainer
} from "./app-config.styles";
import refetchIcon from "../../assets/images/refetch.svg";
import { useSelector } from "react-redux";
import AppPlatform from "./app-item.component";
import AppListConfig from "./app-list.component";
import regeneratorRuntime from "regenerator-runtime";

const AppConfig = ({ onRefetch }) => {
  const [showList, setShowList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { app, platform } = useSelector((state) => state.projectConfig.config);

  const handleGetProject = async () => {
    setIsLoading(true);
    await onRefetch();
    setIsLoading(false);
  };

  return (
    <AppConfigContainer>
      <SelectAppContainer onClick={() => setShowList(!showList)}>
        {app ? (
          <AppPlatform platform={platform} app={app} />
        ) : (
          " برنامه ای انتخاب نشده"
        )}
      </SelectAppContainer>
      <RefetchContainer onClick={handleGetProject}>
        <RefetchIcon src={refetchIcon} isLoading={isLoading} />
      </RefetchContainer>
      <AppListConfig
        style={showList ? { opacity: 1, display: "block" } : { opacity: 0 }}
      />
    </AppConfigContainer>
  );
};

export default AppConfig;
