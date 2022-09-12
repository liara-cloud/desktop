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

const Cancel = () => {
  const { log } = useSelector((state) => state.deploy);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const backToDirectory = () => {
    navigate("/");
    dispatch(deployState(initialStateDeploy));
    dispatch(config(initialStateConfig));
  };

  return (
    <LayoutDeployContainer>
      <div style={{ marginBottom: 15 }}>
        <Title text="استقرار لغو شد" />

        <UploadInfo log={log.toString()} disabled />

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
