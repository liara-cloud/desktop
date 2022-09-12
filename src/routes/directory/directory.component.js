import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dropzone from "../../components/dropzone/dropzone.component";
import { user } from "../../store/authSlice";

const Directory = () => {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    if (isMounted)
      ipcRenderer.on("asynchronous-login", (_, arg) => {
        dispatch(user(arg));

        // push to auth page
        setIsLoading(false);
        !arg.length && navigate("/auth");
      });

    ipcRenderer.send("asynchronous-login", "liara-cloud");

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return <Dropzone />;
};

export default Directory;
