import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import ActionContainer from "../../components/action-container/action-container.component";
import Button from "../../components/button/button.component";
import { LayoutDeployContainer } from "../../components/layout-deploy/layout-deploy.styles";
import Title from "../../components/title/title.component";
import UploadInfo from "../../components/upload-info/upload-info.component";
import cancel from "../../utility/cancel-deploy.utlis";
const Build = () => {
  const { projectConfig, auth: { user }, deploy: { log } } = useSelector(
    state => state
  );
  const [disabled, setDisabled] = useState(false);

  const handleCancel = () => {
    cancel(projectConfig, user);
    setDisabled(true);
  };

  return (
    <LayoutDeployContainer>
      <div style={{ marginBottom: 15 }}>
        <Title text="در حال ساخت..." />
        <UploadInfo log={log.toString()} disabled />
        <ActionContainer justifyContent="center">
          <Button disabled={disabled} onClick={handleCancel}>
            لغو
          </Button>
        </ActionContainer>
      </div>
    </LayoutDeployContainer>
  );
};

export default Build;
