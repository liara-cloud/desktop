import React, { useEffect, useState, useRef } from "react";
import { ipcRenderer } from "electron";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { config } from "../../store/projectConfigSlice";
import { DropzoneContainer } from "./dropzone.styles";
import ErrorState from "./error-state/error-state.component";
import { pathConfig } from "../../store/pathSlice";

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
  const inputEl = useRef();

  const overrideEventDefaults = event => {
    event.preventDefault();
    event.stopPropagation();

    event.type === "dragenter" && setHint(true);
    event.type === "dragleave" && setHint(false);
    event.type === "drop" && setHint(false);
  };

  const handleDragAndDropFiles = event => {
    overrideEventDefaults(event);
    if (!event.dataTransfer) return;
    handleFiles(event.dataTransfer.files);
  };

  const handleFiles = fileList => {
    if (!fileList.length) {
      return;
    }

    const [{ path, webkitRelativePath }] = Array.from(fileList);

    const [root] = webkitRelativePath.split("/");
    const [beforeRoot] = path.split(root);
    const splitedPath = beforeRoot + root;

    webkitRelativePath ? setPath(splitedPath) : setPath(path);

    return ipcRenderer.send("is-directory", {
      path: webkitRelativePath ? splitedPath : path
    });
  };

  useEffect(
    () => {
      if (!path) return;

      dispatch(pathConfig({ path: "" }));

      ipcRenderer.on(
        "is-directory",
        (
          _,
          {
            isDirectory,
            isEmpty,
            config: configLiaraJson,
            liaraJsonSyntaxError
          }
        ) => {
          if (liaraJsonSyntaxError) {
            return setError({
              isEmpty: true,
              msg:
                "طفا فایل liara.json را بازبینی کنید و از ساختار صحیح آن مطمئن شوید."
            });
          }

          if (isEmpty)
            return setError({
              isEmpty: true,
              msg: ".پوشه انتخاب شده خالی است"
            });
          if (!isDirectory)
            return setError({
              isDirectory: true,
              msg: ".تنها انتخاب پوشه مجاز است"
            });

          dispatch(
            config({
              config: configLiaraJson
            })
          );
          dispatch(
            pathConfig({
              path
            })
          );
          navigate("/config");
        }
      );
    },
    [path]
  );

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
      onClick={() => inputEl.current.click()}
    >
      <input
        ref={inputEl}
        onChange={({ target }) => handleFiles(target.files)}
        type="file"
        webkitdirectory="true"
      />
      <p>
        پروژه را در اینجا رها کنید
        <br />و یا
        <span>
          <b>انتخاب کنید</b>
        </span>
      </p>
    </DropzoneContainer>
  );
};

export default Dropzone;
