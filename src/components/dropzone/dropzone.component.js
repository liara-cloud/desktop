import React, { useState } from "react";
import { DropzoneContainer } from "./dropzone.styles";

const Dropzone = () => {
  const [hint, setHint] = useState(false);

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
    if (fileList) {
      let files = Array.from(fileList);
      console.log(files);
    }
  };

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
