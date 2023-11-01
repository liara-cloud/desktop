import React, { useRef, useEffect, useState } from "react";
import { InfoContainer } from "./upload-info.style";
import { ipcRenderer } from "electron";

const UploadInfo = ({
  as = "pre",
  log,
  children,
  zoomMode = false,
  ...otherProps
}) => {
  const preRef = useRef();

  const [style, setStyle] = useState({});

  useEffect(() => {
    ipcRenderer.invoke("platform").then(({  platform }) => {
      if (zoomMode) {
        platform.includes("win")
          ? setStyle({ maxHeight: "94%", height: "94%" })
          : setStyle({ maxHeight: "100%", height: "100%" });
      }
    });
  }, []);

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
      style={style}
      {...otherProps}
    />
  );
};

export default UploadInfo;
