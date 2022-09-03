import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppConfig from "../../components/app-config/app-config.component";
import { getProjects } from "../../utility/getApps.utlis";
import { ConfigContainer, SubTitle, Title } from "./config.styles";
import regeneratorRuntime from "regenerator-runtime";
import { config } from "../../store/projectConfigSlice";

const Config = () => {
  const { region, api_token } = useSelector(
    (state) => state.auth.user.currentAccount
  );
  const projectConfig = useSelector((state) => state.projectConfig);

  const dispatch = useDispatch();

  const fetchProject = async () => {
    const res = await getProjects(region, api_token);
    dispatch(config({ ...projectConfig, projects: res.data.projects }));
  };

  useEffect(() => {
    fetchProject();
  }, [api_token]);

  return (
    <ConfigContainer>
      <Title>انتخاب برنامه</Title>
      <SubTitle>
        برنامه‌ای که میخواهید در آن دیپلوی کنید را انتخاب کنید.
      </SubTitle>
      <AppConfig />
    </ConfigContainer>
  );
};

export default Config;
