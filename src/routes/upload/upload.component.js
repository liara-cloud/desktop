import React from "react";
import { useSelector } from "react-redux";
import ActionContainer from "../../components/action-container/action-container.component";
import Button from "../../components/button/button.component";
import { LayoutDeployContainer } from "../../components/layout-deploy/layout-deploy.styles";
import Title from "../../components/title/title.component";
import UploadProgress from "../../components/upload-progress/upload-progress.component";
import handleCancel from "../../utility/cancel-deploy.utlis";

const Upload = () => {
  const { projectConfig, auth } = useSelector((state) => state);

  return (
    <LayoutDeployContainer>
      <div style={{ marginBottom: 15 }}>
        <Title
          text="در حال آپلود سورس کد"
          subtitle="شما می‌توانید با استفاده از فایل gitignore. حجم فایل آپلودی را کاهش دهید."
        />
        <UploadProgress />
        <ActionContainer justifyContent="center">
          <Button onClick={() => handleCancel(projectConfig, auth)}>لغو</Button>
        </ActionContainer>
      </div>
    </LayoutDeployContainer>
  );
};

export default Upload;
