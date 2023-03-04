import React, { useRef, useEffect } from "react";
import { InfoContainer } from "./upload-info.style";

const UploadInfo = ({ as = "pre", log, children, ...otherProps }) => {
  const preRef = useRef();

  useEffect(() => {
    if (!preRef.current) {
      return;
    }
    const isScrolledToBottom =
      preRef.current.scrollHeight - preRef.current.clientHeight <=
      preRef.current.scrollTop + 1;
    if (!isScrolledToBottom) {
      preRef.current.scrollTop =
        preRef.current.scrollHeight - preRef.current.clientHeight;
    }
  });

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
      ref={preRef}
      {...otherProps}
    />
  );
};

export default UploadInfo;
