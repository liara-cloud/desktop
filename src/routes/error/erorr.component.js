import { ipcRenderer } from "electron";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ActionContainer from "../../components/action-container/action-container.component";
import Button from "../../components/button/button.component";
import { LayoutDeployContainer } from "../../components/layout-deploy/layout-deploy.styles";
import Title from "../../components/title/title.component";
import UploadInfo from "../../components/upload-info/upload-info.component";
import { deployState, initialStateDeploy } from "../../store/deploySlice";
import { config, initialStateConfig } from "../../store/projectConfigSlice";

const Error = () => {
  const { log } = useSelector(state => state.deploy);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const backToDirectory = () => {
    navigate("/");
    dispatch(deployState({ ...initialStateDeploy, status: "redeploy" }));
    dispatch(config(initialStateConfig));
  };

  const handleGetLog = () => {
    ipcRenderer.send("show-dialog", "liara-cloud");
  };

  return (
    <LayoutDeployContainer>
      <div style={{ marginBottom: 15 }}>
        <Title
          error
          text="استقرار با خطا مواجه شد"
          subtitle="  ﺩﺭ ﺻﻮﺭﺕ ﻧﯿﺎﺯ ﺑﻪ ﭘﺸﺘﯿﺒﺎﻧﯽ، ﻻﮒﻫﺎﯼ ﺍﯾﻦ ﺍﺳﺘﻘﺮﺍﺭ ﺭﺍ ﺩﺭﯾﺎﻓﺖ ﻭ
ﺩﺭ ﺗﯿﮑﺖ ﭘﯿﻮﺳﺖ ﮐﻨﯿﺪ."
        />

        <UploadInfo log={log.toString()} disabled />

        <ActionContainer>
          <Button style={{ padding: "5px 20px" }} onClick={backToDirectory}>
            استقرار مجدد
          </Button>
          <Button
            variant="outlined"
            style={{ padding: "5px 20px" }}
            onClick={handleGetLog}
          >
            دریافت لاگ
          </Button>
        </ActionContainer>
      </div>
    </LayoutDeployContainer>
  );
};

export default Error;
