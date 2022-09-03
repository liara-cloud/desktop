import React, { useEffect, useState } from "react";
import {
  AppConfigContainer,
  Refetch,
  SelectAppContainer
} from "./app-config.styles";
import refetchIcon from "../../assets/images/refetch.svg";
import { useSelector } from "react-redux";
import AppPlatform from "./app-item.component";
import AppListConfig from "./app-list.component";
const AppConfig = () => {
  const [showList, setShowList] = useState(false);
  const { app, platform } = useSelector((state) => state.projectConfig.config);

  return (
    <AppConfigContainer>
      <SelectAppContainer onClick={() => setShowList(!showList)}>
        {app ? (
          <AppPlatform platform={platform} app={app} />
        ) : (
          " برنامه ای انتخاب نشده"
        )}
      </SelectAppContainer>
      <Refetch>
        <img src={refetchIcon} />
      </Refetch>
      <AppListConfig isShow={showList} />
    </AppConfigContainer>
  );
};

export default AppConfig;
