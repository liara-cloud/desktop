import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BlurContainer } from "../../components/blur-container/blur-container.styles";
import Dropzone from "../../components/dropzone/dropzone.component";
import Spinner from "../../components/sppiner/spinner.component";
import { user } from "../../store/authSlice";

const Directory = () => {
  const platformOS = window.navigator.platform;
  const isWin = platformOS === "Win32" || platformOS === "Win64";

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    if (isMounted)
      ipcRenderer.on("asynchronous-login", (_, arg) => {
        !arg.length && navigate("/auth");

        // push to auth page
        setIsLoading(false);
        dispatch(user(arg));
      });

    ipcRenderer.send("asynchronous-login", "liara-cloud");

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading)
    return (
      <BlurContainer height={!isWin ? "100vh" : "94vh"} justify="center">
        <Spinner />
      </BlurContainer>
    );

  return <Dropzone />;
};

export default Directory;
