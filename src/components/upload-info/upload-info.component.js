import React from "react";
import { InfoContainer } from "./upload-info.style";

const UploadInfo = ({ as = "textarea", log, children, ...otherProps }) => {
  return (
    <InfoContainer as={as} value={log} {...otherProps}>
      {children}
    </InfoContainer>
  );
};

export default UploadInfo;
