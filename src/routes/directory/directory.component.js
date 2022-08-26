import { ipcRenderer } from "electron";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user } from "../../store/authSlice";

const Directory = () => {
  const dispatch = useDispatch();
  const { accounts, isLoading } = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    ipcRenderer.on("asynchronous-login", (_, arg) => {
      dispatch(user(arg));
      if (!accounts.length) {
        navigate("/auth");
      }
    });
    ipcRenderer.send("asynchronous-login", "liara-cloud");
  }, [accounts]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return <div>Directory</div>;
};

export default Directory;
