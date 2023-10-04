import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ActionContainer from "../../components/action-container/action-container.component";
import Button from "../../components/button/button.component";
import {
  LayoutDeployContainer,
  ResizeButton
} from "../../components/layout-deploy/layout-deploy.styles";
import Title from "../../components/title/title.component";
import UploadInfo from "../../components/upload-info/upload-info.component";
import { deployState, initialStateDeploy } from "../../store/deploySlice";
import { config, initialStateConfig } from "../../store/projectConfigSlice";
import { ipcRenderer } from "electron";
import resizeIcon from "../../assets/images/resize.svg";

const Cancel = () => {
  const { log } = useSelector(state => state.deploy);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMaxScreen, setIsMaxScreen] = useState(false);

  const backToDirectory = () => {
    navigate("/");
    dispatch(deployState({ ...initialStateDeploy, status: "redeploy" }));
    dispatch(config(initialStateConfig));
  };

  const handleResizable = () => {
    setIsMaxScreen(true);
    ipcRenderer.send("screen-size", {
      resizable: true,
      width: 450,
      height: 650,
      maxHeight: 2000,
      maxWidth: 2000
    });
  };

  const handleScreenDefault = () => {
    setIsMaxScreen(false);
    ipcRenderer.send("screen-size", {
      resizable: false,
      width: 350,
      height: 550,
      maxHeight: 350,
      maxWidth: 550
    });
  };

  if (isMaxScreen) {
    return (
      <div style={{ height: "100%", paddingBottom: 100, position: "relative" }}>
        <UploadInfo zoomMode={true} log={log.toString()} disabled />
        <ResizeButton onClick={handleScreenDefault}>
          <img src={resizeIcon} />
          کوچک‌نمایی
        </ResizeButton>
      </div>
    );
  }

  return (
    <LayoutDeployContainer>
      <div style={{ marginBottom: 15 }}>
        <Title text="استقرار لغو شد" />
        <div style={{ position: "relative" }}>
          <UploadInfo log={log.toString()} disabled />
          <ResizeButton onClick={handleResizable}>
            <img src={resizeIcon} />
            بزرگ‌‌نمایی
          </ResizeButton>
        </div>

        <ActionContainer justifyContent="center">
          <Button style={{ padding: "5px 20px" }} onClick={backToDirectory}>
            استقرار مجدد
          </Button>
        </ActionContainer>
      </div>
    </LayoutDeployContainer>
  );
};

export default Cancel;
