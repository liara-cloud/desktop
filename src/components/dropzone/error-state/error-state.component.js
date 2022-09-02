import React from "react";
import { DropzoneContainer } from "../dropzone.styles";

const ErrorState = ({ message }) => {
  return <DropzoneContainer isError={true}>{message}</DropzoneContainer>;
};

export default ErrorState;
