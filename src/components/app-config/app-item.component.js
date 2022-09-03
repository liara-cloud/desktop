import React from "react";
import PlatfromIcon from "../platform-icon/platform-icon.component";
import { AppPlatformContainer } from "./app-item.styles";

const AppPlatform = ({ app = "react-preos", platform = "react" }) => {
  return (
    <AppPlatformContainer>
      <PlatfromIcon platform={platform} />
      <p>{app}</p>
    </AppPlatformContainer>
  );
};

export default AppPlatform;
