import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { withRouter } from "react-router";

function DragDrop(props) {
  const [file, setFile] = useState("");
  const handleChange = (file) => {
    setFile(file);
  };
  file !== "" && props.history.push("/SelectApps");
  return (
    <>
      <div dir="rtl" className="drag-drop">
        <FileUploader handleChange={handleChange} name="file" />
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
