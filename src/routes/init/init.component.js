import React from "react";
import { useSelector } from "react-redux";
import ActionContainer from "../../components/action-container/action-container.component";
import Button from "../../components/button/button.component";
import Gap from "../../components/gap/gap.component";
import LayoutDeploy from "../../components/layout-deploy/layout-deploy.component";
import TextField from "../../components/text-field/text-field.component";
import Title from "../../components/title/title.component";

const Init = () => {
  const { log } = useSelector((state) => state.deploy);

  return (
    <LayoutDeploy>
      <div style={{ marginBottom: 15 }}>
        <Title text="در حال آماده‌سازی..." />

        <Gap h={15} />
        <TextField type="textarea" value={log} disabled rows="15" />
        <Gap h={20} />
        <ActionContainer justifyContent="center">
          <Button>لغو</Button>
        </ActionContainer>
      </div>
    </LayoutDeploy>
  );
};

export default Init;
