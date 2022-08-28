import React, { Fragment, useCallback } from "React";
import { useDropzone } from "React-dropzone";
import { DropzoneContainer } from "./dropzone.styles";
const Dropzone = ({ open }) => {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({});

  return (
    <DropzoneContainer isDragActive={isDragActive} {...getRootProps()}>
      <input {...getInputProps()} />
      <p>
        پروژه را در اینجا رها کنید
        <br />و یا <b> انتخاب کنید.</b>
      </p>
    </DropzoneContainer>
  );
};

export default Dropzone;
