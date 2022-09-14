import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import ActionContainer from "../../components/action-container/action-container.component";
import Button from "../../components/button/button.component";
import { LayoutDeployContainer } from "../../components/layout-deploy/layout-deploy.styles";
import Title from "../../components/title/title.component";
import UploadInfo from "../../components/upload-info/upload-info.component";
import handleCancel from "../../utility/cancel-deploy.utlis";
const Build = () => {
  const {
    projectConfig,
    auth,
    deploy: { log }
  } = useSelector((state) => state);

  return (
    <LayoutDeployContainer>
      <div style={{ marginBottom: 15 }}>
        <Title text="در حال ساخت..." />
        <UploadInfo log={log.toString()} disabled />
        <ActionContainer justifyContent="center">
          <Button onClick={() => handleCancel(projectConfig, auth)}>لغو</Button>
        </ActionContainer>
      </div>
    </LayoutDeployContainer>
  );
};

export default Build;
