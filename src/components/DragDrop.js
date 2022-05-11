import { FileUploader } from "@liara/react-drag-drop-files";
import React, { useContext, useEffect, useRef, useState } from "react";
import { withRouter } from "react-router";
import { Context } from "./contextApi/Context";

function DragDrop(props) {
  const dropBox = useRef();
  const context = useContext(Context);

  const {
    file,
    setFile,
    checkIsDirectory,
    checkDirectory,
    setCheckDirectory,
    setPort,
    setSelected,
    getProject,
    selected,
  } = context;
  const [projectConfig, setProjectConfig] = useState({});
  const handleChange = (file) => {
    const root_name = file.webkitRelativePath.split("/")[0];
    const before_root_path = file.path.split(root_name)[0];
    const path = before_root_path + root_name;

    // check select or drag
    root_name
      ? setFile(path) + checkIsDirectory(path)
      : setFile(file.path) + checkIsDirectory(file.path);
  };

  useEffect(() => {
    if (!!checkDirectory.config) {
      getProject().then(({ data: { projects } }) => {
        const filterd = projects.filter(
          ({ project_id }) => project_id == checkDirectory.config.app
        )[0];
        setSelected({
          project_id: checkDirectory.config.app,
          type: filterd.type,
        });
      });

      setPort(checkDirectory.config.port);
    }

    if (checkDirectory.isDirectory && !checkDirectory.isEmpty) {
      if (checkDirectory.config.app) {
        selected && props.history.push("/SelectApps");
      } else {
        props.history.push("/SelectApps");
      }
    }
  }, [checkDirectory, selected]);

  if (checkDirectory.isDirectory == false || checkDirectory.isEmpty) {
    setTimeout(() => {
      setCheckDirectory("");
    }, 1000);
  }

  const isEmptyFolder = checkDirectory.isDirectory && checkDirectory.isEmpty;
  const handleDirectory = checkDirectory === "" && handleChange;
  return (
    <>
      <div
        dir="rtl"
        className="drag-drop"
        ref={dropBox}
        id="drop-box"
        style={
          checkDirectory.isDirectory == false || isEmptyFolder
            ? { borderColor: "#ea5167" }
            : {}
        }
      >
        <FileUploader
          onlyDirectory="true"
          handleChange={handleDirectory}
          name="file"
        />
        <div className="select-projct">
          <p>پروژه را در اینجا رها کنید</p>
          <span>
            {" "}
            و یا <button className="btn select">انتخاب کنید</button>
          </span>
        </div>
      </div>
      {checkDirectory.isDirectory == false && (
        <div className="alert-directory">
          <p>( تنها انتخاب پوشه مجاز است )</p>
        </div>
      )}
      {isEmptyFolder && (
        <div className="alert-directory">
          <p>( پوشه انتخاب شده خالی است )</p>
        </div>
      )}
    </>
  );
}

export default withRouter(DragDrop);
