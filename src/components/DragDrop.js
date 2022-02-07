import { FileUploader } from "@liara/react-drag-drop-files";
import React, { useContext, useState } from "react";
import { withRouter } from "react-router";
import { Context } from "./contextApi/Context";
import { Folder } from "./icon";

function DragDrop(props) {
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
    setFile(file.path);
    checkIsDirectory(file.path);
  };
  checkDirectory.isDirectory && props.history.push("/SelectApps");

  if (checkDirectory.config !== undefined && checkDirectory.config !== false) {
    setSelected({
      project_id: checkDirectory.config.app,
      type: checkDirectory.config.platform,
    });
  }

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
          <p>پروژه رو در اینجا رها کنید</p>
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
