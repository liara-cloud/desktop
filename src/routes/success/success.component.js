import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ActionContainer from "../../components/action-container/action-container.component";
import Button from "../../components/button/button.component";
import { LayoutDeployContainer } from "../../components/layout-deploy/layout-deploy.styles";
import Title from "../../components/title/title.component";
import UploadInfo from "../../components/upload-info/upload-info.component";
import { ipcRenderer } from "electron";
import liaraDomianProject from "../../utility/liara-domain-project.utils";
import { deployState, initialStateDeploy } from "../../store/deploySlice";
import { config, initialStateConfig } from "../../store/projectConfigSlice";

const Success = () => {
  const { projectConfig, auth, deploy: { log } } = useSelector(state => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const backToDirectory = () => {
    navigate("/");
    dispatch(deployState({ ...initialStateDeploy, status: "redeploy" }));
    dispatch(config(initialStateConfig));
  };

  const openProjectInBrowser = () => {
    const { region } = auth.user.currentAccount;
    const { app } = projectConfig.config;
    ipcRenderer.send("console", {
      url: liaraDomianProject(region, app)
    });
  };

  return (
    <LayoutDeployContainer>
      <div style={{ marginBottom: 15 }}>
        <Title text="استقرار انجام شد" />

        <UploadInfo log={log.toString()} disabled />

        <ActionContainer>
          <Button
            onClick={openProjectInBrowser}
            style={{ padding: "5px 10px" }}
          >
            نمایش در مرورگر
          </Button>
          <Button
            variant="outlined"
            style={{ padding: "5px 20px" }}
            onClick={backToDirectory}
          >
            استقرار مجدد
          </Button>
        </ActionContainer>
      </div>
    </LayoutDeployContainer>
  );
};

export default Success;
