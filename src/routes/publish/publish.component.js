import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import ActionContainer from "../../components/action-container/action-container.component";
import Button from "../../components/button/button.component";
import { LayoutDeployContainer } from "../../components/layout-deploy/layout-deploy.styles";
import Title from "../../components/title/title.component";
import UploadInfo from "../../components/upload-info/upload-info.component";

const Publish = () => {
  return (
    <LayoutDeployContainer>
      <div style={{ marginBottom: 15 }}>
        <Title text="در حال انتشار..." />

        <UploadInfo log={log.toString()} disabled />

        <ActionContainer justifyContent="center">
          <Button style={{ opacity: 0.6 }}>لغو</Button>
        </ActionContainer>
      </div>
    </LayoutDeployContainer>
  );
};

export default Publish;
