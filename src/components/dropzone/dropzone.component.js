import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { config } from "../../store/projectConfigSlice";
import { DropzoneContainer } from "./dropzone.styles";
import ErrorState from "./error-state/error-state.component";

const initErrorState = {
  isDirectory: false,
  isEmpty: false,
  message: ""
};

const Dropzone = () => {
  const [hint, setHint] = useState(false);
  const [error, setError] = useState(initErrorState);
  const [path, setPath] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const overrideEventDefaults = (event) => {
    event.preventDefault();
    event.stopPropagation();

    event.type === "dragenter" && setHint(true);
    event.type === "dragleave" && setHint(false);
    event.type === "drop" && setHint(false);
  };

  const handleDragAndDropFiles = (event) => {
    overrideEventDefaults(event);
    if (!event.dataTransfer) return;
    handleFiles(event.dataTransfer.files);
  };

  const handleFiles = (fileList) => {
    if (!fileList) {
      return;
    }

    const [{ path }] = Array.from(fileList);
    setPath(path);
    ipcRenderer.send("is-directory", {
      path
    });
  };

  useEffect(() => {
    if (!path) return;
    ipcRenderer.on(
      "is-directory",
      (_, { isDirectory, isEmpty, config: configLiaraJosn }) => {
        if (isEmpty)
          return setError({ isEmpty: true, msg: ".پوشه انتخاب شده خالی است" });
        if (!isDirectory)
          return setError({
            isDirectory: true,
            msg: ".تنها انتخاب پوشه مجاز است"
          });

        dispatch(
          config({
            path,
            config: configLiaraJosn,
            projects: []
          })
        );
        navigate("/config");
      }
    );
  }, [path]);

  if (error.isEmpty || error.isDirectory) {
    setTimeout(() => {
      setError(initErrorState);
    }, 3000);

    return <ErrorState message={error.msg} />;
  }

  return (
    <DropzoneContainer
      onDrop={handleDragAndDropFiles}
      onDragEnter={overrideEventDefaults}
      onDragLeave={overrideEventDefaults}
      onDragOver={overrideEventDefaults}
      hint={hint}
    >
      {/* <input type="file" webkitdirectory="true" /> */}
      <p>
        پروژه را در اینجا رها کنید
        <br />و یا <b> انتخاب کنید.</b>
      </p>
    </DropzoneContainer>
  );
};

export default Dropzone;
