import React, { Fragment, useState } from "react";
import {
  AppConfigContainer,
  AppItem,
  SelectAppContainer
} from "./app-config.styles";
import { useSelector } from "react-redux";
import AppPlatform from "./app-item.component";
import AppListConfig from "./app-list.component";
import arrow from "../../assets/images/arrow.svg";
import tick from "../../assets/images/tick.svg";
import Gap from "../gap/gap.component";

const AppConfig = () => {
  const [showList, setShowList] = useState(false);
  const { app, platform } = useSelector(state => state.projectConfig.config);

  return (
    <AppConfigContainer>
      <div>
        <SelectAppContainer
          absolute={true}
          onClick={() => setShowList(!showList)}
        >
          <div style={{ padding: "10px 10px 2px" }}>
            <AppItem>
              {app
                ? <Fragment>
                    <AppPlatform platform={platform} app={app} />
                    <img src={tick} style={{ marginTop: "-2px" }} width={15} />
                  </Fragment>
                : <Fragment>
                    <span> برنامه ای انتخاب نشده</span>
                    <img src={arrow} />
                  </Fragment>}
            </AppItem>
          </div>
          <div>
            <AppListConfig
              currentApp={app}
              onClose={() => setShowList(false)}
              style={
                showList ? { opacity: 1, display: "block" } : { opacity: 0 }
              }
            />
          </div>
        </SelectAppContainer>
        <Gap h={36} />
      </div>
    </AppConfigContainer>
  );
};

export default AppConfig;
