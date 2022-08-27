import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user } from "../../store/authSlice";

const Directory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const auth = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.on("asynchronous-login", (_, arg) => {
      dispatch(user(arg));

      // push to auth page
      setIsLoading(false);
      !arg.length && navigate("/auth");
    });
    ipcRenderer.send("asynchronous-login", "liara-cloud");
  }, []);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return <div>Directory</div>;
};

export default Directory;
