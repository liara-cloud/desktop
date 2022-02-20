import { FileUploader } from "@liara/react-drag-drop-files";
import React, { useContext, useEffect, useRef, useState } from "react";
import { withRouter } from "react-router";
import { Context } from "./contextApi/Context";
import { Folder } from "./icon";

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
    selected,
  } = context;
  const handleChange = (file) => {
    const root_name = file.webkitRelativePath.split("/")[0];
    const before_root_path = file.path.split(root_name)[0];
    const path = before_root_path + root_name;

    // check select or drag
    root_name
      ? setFile(path) + checkIsDirectory(path)
      : setFile(file.path) + checkIsDirectory(file.path);
  };

  if (checkDirectory.config !== undefined && checkDirectory.config !== false) {
    if (checkDirectory.config.platform && checkDirectory.config.app) {
      setSelected({
        project_id: checkDirectory.config.app,
        type: checkDirectory.config.platform,
      });
    }
    setPort(checkDirectory.config.port);
  }

  checkDirectory.isDirectory && props.history.push("/SelectApps");

  if (checkDirectory.isDirectory == false) {
    setTimeout(() => {
      setCheckDirectory("");
    }, 3000);
  }

  return (
    <>
      <div
        dir="rtl"
        className="drag-drop"
        ref={dropBox}
        id="drop-box"
        style={
          checkDirectory.isDirectory == false ? { borderColor: "#ea5167" } : {}
        }
      >
        <FileUploader
          onlyDirectory="true"
          handleChange={handleChange}
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
          <p>( خطا در شناسایی فولدر پروژه )</p>
        </div>
      )}
    </>
  );
}

export default withRouter(DragDrop);
