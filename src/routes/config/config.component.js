import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppConfig from "../../components/app-config/app-config.component";
import { getProjects } from "../../utility/getApps.utlis";
import { ConfigContainer } from "./config.styles";
import regeneratorRuntime from "regenerator-runtime";
import { config } from "../../store/projectConfigSlice";
import Gap from "../../components/gap/gap.component";
import TextField from "../../components/text-field/text-field.component";
import Button from "../../components/button/button.component";
import { Link, useNavigate } from "react-router-dom";
import Title from "../../components/title/title.component";
import ActionContainer from "../../components/action-container/action-container.component";
import { ipcRenderer } from "electron";

const initConfig = {
  app: "",
  port: "",
  type: ""
};

const Config = () => {
  const { region, api_token } = useSelector(
    (state) => state.auth.user.currentAccount
  );

  const { projectConfig, auth } = useSelector((state) => state);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchProject = async () => {
    const res = await getProjects(region, api_token);
    dispatch(config({ ...projectConfig, projects: res.data.projects }));
  };

  useEffect(() => {
    fetchProject();
  }, [api_token]);

  const handleSetPort = (port) => {
    dispatch(
      config({ ...projectConfig, config: { ...projectConfig.config, port } })
    );
  };

  const backToDirectory = () => {
    dispatch(config({ ...projectConfig, config: initConfig }));
    navigate("/");
  };

  const startDeploy = () => {
    const { path, config } = projectConfig;

    const { currentAccount } = auth.user;
    ipcRenderer.send("deploy", {
      account_name: currentAccount.account_name,
      region: currentAccount.region,
      api_token: currentAccount.api_token,
      path,
      config: {
        ...config.config,
        app: config.app,
        platform: config.platform,
        port: config.port
      }
    });

    return navigate("/init");
  };

  return (
    <ConfigContainer>
      <Title
        text="انتخاب برنامه"
        subtitle="برنامه‌ای که میخواهید در آن دیپلوی کنید را انتخاب کنید."
      />

      <AppConfig />
      <Gap h={90} />
      <Title text="تعیین پورت" subtitle="پورت مورد نظرتان را وارد کنید." />

      <Gap h={18} />
      <TextField
        type="number"
        value={projectConfig.config?.port || ""}
        min="1"
        onChange={({ target }) => handleSetPort(target.value)}
      />
      <Gap h={35} />
      <ActionContainer>
        <Button onClick={startDeploy}>بعدی</Button>
        <Button variant="outlined" onClick={backToDirectory}>
          قبلی
        </Button>
      </ActionContainer>
    </ConfigContainer>
  );
};

export default Config;
