import { FileUploader } from "@liara/react-drag-drop-files";
import React, { useContext, useState } from "react";
import { withRouter } from "react-router";
import { Context } from "./contextApi/Context";

function DragDrop(props) {
  const context = useContext(Context);
  const { file, setFile } = context;
  const handleChange = (file) => {
    setFile(file.path);
  };
  file !== "" && props.history.push("/SelectApps");
  return (
    <>
      <div dir="rtl" className="drag-drop">
        <FileUploader onlyDirectory="true" handleChange={handleChange} name="file" />
        <div className="select-projct">
          <p>پروژه رو در اینجا رها کنید</p>
          <span>
            {" "}
            و یا <button className="btn select">انتخاب کنید</button>
          </span>
        </div>
      </div>
    </>
  );
}

export default withRouter(DragDrop);
