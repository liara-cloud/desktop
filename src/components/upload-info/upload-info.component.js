import React from "react";
import { InfoContainer } from "./upload-info.style";

const UploadInfo = ({ as = "pre", log, children, ...otherProps }) => {
  if (as == "div") {
    return (
      <InfoContainer as={as} {...otherProps}>
        {children}
      </InfoContainer>
    );
  }

  return (
    <InfoContainer
      dangerouslySetInnerHTML={{ __html: log }}
      {...otherProps}
    ></InfoContainer>
  );
};

export default UploadInfo;
