import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppConfig from "../../components/app-config/app-config.component";
import { getProjects } from "../../utility/get-apps.utlis";
import {
  AppContainer,
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
import defaultPorts from "../../utility/default-ports";

import refetchIcon from "../../assets/images/revoke.svg";
import { allProjects } from "../../store/projectsSlice";

const initConfig = {
  app: "",
  port: "",
  platform: ""
};
const initEmpty = { app: false, port: false };
const Config = () => {
  const { region, api_token } = useSelector(
    state => state.auth.user.currentAccount
  );

  const platformOS = window.navigator.platform;
  const isWin = platformOS === "Win32" || platformOS === "Win64";

  const [isLoading, setIsLoading] = useState({ fetch: true, refetch: false });
  const [isEmpty, setIsEmpty] = useState(initEmpty);
  const [showPortInput, setShowPortInput] = useState(true);

  const { projectConfig, auth, projects , path : {path} } = useSelector(state => state);
  const { app, port, platform } = projectConfig.config;

  const [initialPort] = useState(port);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchProject = async () => {
    setIsLoading({ ...isLoading, refetch: true });

    const initialSpin = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 700);
    });

    const [_, res] = await Promise.allSettled([
      initialSpin,
      getProjects(region, api_token)
    ]);

    const [project] = res.value.data.projects.filter(
      item => item.project_id === app
    );

    if (!project?.type) {
      dispatch(
        config({
          config: {
            ...projectConfig.config,
            ...initConfig,
          }
        })
      );
    } else {
      !platform && dispatch(
        config({
          config: { ...projectConfig.config, platform: project.type, }
        })
      );
    }

    setIsLoading({ fetch: false, refetch: false });

    dispatch(allProjects(res.value.data.projects));
  };

  useEffect(
    () => {
      fetchProject();
    },
    [api_token]
  );

  useEffect(
    () => {
      if ( ! platform) {
        return;
      }

      dispatch(
        config({
          config: { ...projectConfig.config, port: initialPort }
        })
      );

      const [defaultPort] = defaultPorts.filter(p => p.name === platform);

      setShowPortInput(Boolean(!defaultPort || defaultPort?.showInput));

      if( ! defaultPort) {
        return;
      }

      dispatch(
        config({
          config: { ...projectConfig.config, port: defaultPort.port }
        })
      );
    },
    [platform]
  );

  const handleSetPort = port => {
    dispatch(
      config({ config: { ...projectConfig.config, port } })
    );
  };

  const backToDirectory = () => {
    dispatch(config({ config: initConfig }));
    navigate("/");
  };

  const startDeploy = () => {
    if (!app || !port)
      return setIsEmpty({ port: !Boolean(port), app: !Boolean(app) });
    const { config } = projectConfig;

    const { currentAccount } = auth.user;
    ipcRenderer.send("deploy", {
      account_name: currentAccount.account_name,
      region: currentAccount.region,
      api_token: currentAccount.api_token,
      path,
      config,
    });

    return navigate("/upload");
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
      <BlurContainer height={!isWin ? '100vh' : '94vh'} justify="center">
        <Spinner />
      </BlurContainer>
    );


  

  if (!projects.data.length)
    return (
      <ConfigContainer>
        <Title
          text="برنامه ای یافت نشد."
          subtitle="شما هیچ برنامه ای ندارید. ابتدا وارد کنسول لیارا شوید و برنامه ای
        بسازید."
        >
          <RefetchIcon
            src={refetchIcon}
            onClick={fetchProject}
            isLoading={isLoading.refetch}
          />
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
        subtitle="برنامه‌ای که می‌خواهید در آن دیپلوی کنید را انتخاب کنید."
      >
        <RefetchIcon
          src={refetchIcon}
          onClick={fetchProject}
          isLoading={isLoading.refetch}
        />
      </Title>
      <AppContainer>
        <AppConfig onRefetch={fetchProject} />
      </AppContainer>
      {showPortInput &&
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
            style={{ cursor: "text", direction: "ltr" }}
            onChange={({ target }) => handleSetPort(target.value)}
          />
        </Fragment>}
      <Gap h={!showPortInput ? 101 + 35 : 35} />
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
