import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppConfig from "../../components/app-config/app-config.component";
import { getProjects } from "../../utility/get-apps.utlis";
import {
  ConfigContainer,
  RefetchContainer,
  RefetchIcon,
  RefetchText
} from "./config.styles";
import regeneratorRuntime from "regenerator-runtime";
import { config } from "../../store/projectConfigSlice";
import Gap from "../../components/gap/gap.component";
import TextField from "../../components/text-field/text-field.component";
import Button from "../../components/button/button.component";
import { useNavigate } from "react-router-dom";
import Title from "../../components/title/title.component";
import ActionContainer from "../../components/action-container/action-container.component";
import { ipcRenderer } from "electron";
import Spinner from "../../components/sppiner/spinner.component";
import { BlurContainer } from "../../components/blur-container/blur-container.styles";
import portTypes from "../../utility/ports/port-types";

import refetchIcon from "../../assets/images/refetch.svg";

const initConfig = {
  app: "",
  port: "",
  type: ""
};
const initEmpty = { app: false, port: false };

const Config = () => {
  const { region, api_token } = useSelector(
    state => state.auth.user.currentAccount
  );

  const [isLoading, setIsLoading] = useState({ fetch: true, refetch: false });
  const [isEmpty, setIsEmpty] = useState(initEmpty);
  const [hasDefaultPort, setHasDefaultPort] = useState(false);

  const { projectConfig, auth } = useSelector(state => state);
  const { app, port, platform } = projectConfig.config;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchProject = async () => {
    setIsLoading({ ...isLoading, refetch: true });
    const res = await getProjects(region, api_token);
    dispatch(config({ ...projectConfig, projects: res.data.projects }));
    setIsLoading({ fetch: false, refetch: false });
  };

  useEffect(
    () => {
      fetchProject();
    },
    [api_token]
  );

  useEffect(
    () => {
      if (platform) {
        const [item] = portTypes.filter(item => item.name === platform);

        if (!Boolean(item)) return setHasDefaultPort(false);

        dispatch(
          config({
            ...projectConfig,
            config: { ...projectConfig.config, port: item.port }
          })
        );
        setHasDefaultPort(true);
      }
    },
    [platform]
  );

  const handleSetPort = port => {
    dispatch(
      config({ ...projectConfig, config: { ...projectConfig.config, port } })
    );
  };

  const backToDirectory = () => {
    dispatch(config({ ...projectConfig, config: initConfig }));
    navigate("/");
  };

  const startDeploy = () => {
    if (!app || !port)
      return setIsEmpty({ port: !Boolean(port), app: !Boolean(app) });
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

  const openConsole = () => {
    ipcRenderer.send("console", {
      url: `https://console.liara.ir/apps/create`
    });
  };

  if (isEmpty.app || isEmpty.port) {
    setTimeout(() => {
      setIsEmpty(initEmpty);
    }, 2000);
  }

  if (isLoading.fetch)
    return (
      <BlurContainer justify="center">
        <Spinner />
      </BlurContainer>
    );

  if (!projectConfig.projects.length)
    return (
      <ConfigContainer>
        <Title
          text="برنامه ای یافت نشد."
          subtitle="شما هیچ برنامه ای ندارید. ابتدا وارد کنسول لیارا شوید و برنامه ای
        بسازید."
        >
          <RefetchContainer onClick={fetchProject}>
            <RefetchIcon src={refetchIcon} isLoading={isLoading.refetch} />
          </RefetchContainer>
        </Title>

        <Gap h={265} />
        <ActionContainer>
          <Button
            onClick={openConsole}
            style={{ padding: "5px 20px" }}
            className="umami--click--create-app"
          >
            ساخت برنامه
          </Button>
          <Button variant="outlined" onClick={backToDirectory}>
            قبلی
          </Button>
        </ActionContainer>
      </ConfigContainer>
    );

  return (
    <ConfigContainer>
      <Title
        error={isEmpty.app}
        text="انتخاب برنامه"
        subtitle="برنامه‌ای که میخواهید در آن دیپلوی کنید را انتخاب کنید."
      >
        <RefetchContainer onClick={fetchProject}>
          <RefetchIcon src={refetchIcon} isLoading={isLoading.refetch} />
        </RefetchContainer>
      </Title>
      <AppConfig onRefetch={fetchProject} />
      {!hasDefaultPort &&
        <Fragment>
          <Title
            error={isEmpty.port}
            text="تعیین پورت"
            subtitle="پورت مورد نظرتان را وارد کنید."
          />

          <Gap h={18} />
          <TextField
            type="number"
            value={projectConfig.config?.port || ""}
            min="1"
            style={{ cursor: "text" }}
            onChange={({ target }) => handleSetPort(target.value)}
          />
        </Fragment>}
      <Gap h={hasDefaultPort ? 101 + 35 : 35} />
      <ActionContainer>
        <Button onClick={startDeploy} className="umami--click--start-deploy">
          بعدی
        </Button>
        <Button variant="outlined" onClick={backToDirectory}>
          قبلی
        </Button>
      </ActionContainer>
    </ConfigContainer>
  );
};

export default Config;
