import React from "react";

import ActionContainer from "../../components/action-container/action-container.component";
import Button from "../../components/button/button.component";
import Gap from "../../components/gap/gap.component";
import LayoutDeploy from "../../components/layout-deploy/layout-deploy.component";
import Title from "../../components/title/title.component";
import UploadProgress from "../../components/upload-progress/upload-progress.component";

const Upload = () => {
  return (
    <LayoutDeploy>
      <div style={{ marginBottom: 15 }}>
        <Title
          text="در حال آپلود سورس کد"
          subtitle="شما میتوانید با استفاده از فایل gitignore. حجم فایل آپلودی را کاهش دهید."
        />

        <Gap h={15} />
        <UploadProgress />
        <Gap h={20} />
        <ActionContainer justifyContent="center">
          <Button>لغو</Button>
        </ActionContainer>
      </div>
    </LayoutDeploy>
  );
};

export default Upload;
