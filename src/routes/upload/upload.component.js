import React from "react";
import { useSelector } from "react-redux";
import ActionContainer from "../../components/action-container/action-container.component";
import Button from "../../components/button/button.component";
import LayoutDeploy from "../../components/layout-deploy/layout-deploy.component";
import Title from "../../components/title/title.component";
import UploadProgress from "../../components/upload-progress/upload-progress.component";
import handleCancel from "../../utility/cancelDeploy.utlis";

const Upload = () => {
  const { projectConfig, auth } = useSelector((state) => state);

  return (
    <LayoutDeploy>
      <div style={{ marginBottom: 15 }}>
        <Title
          text="در حال آپلود سورس کد"
          subtitle="شما میتوانید با استفاده از فایل gitignore. حجم فایل آپلودی را کاهش دهید."
        />
        <UploadProgress />
        <ActionContainer justifyContent="center">
          <Button onClick={() => handleCancel(projectConfig, auth)}>لغو</Button>
        </ActionContainer>
      </div>
    </LayoutDeploy>
  );
};

export default Upload;
