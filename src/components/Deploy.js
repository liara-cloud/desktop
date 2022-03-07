import React, { useContext, useEffect, useRef } from "react";
import { Context } from "./contextApi/Context";
import { AnsiUp } from "ansi-up";
import PreparationBuild from "./statue/preparationBuild";
import UploadProgress from "./statue/UploadProgress";
import Error from "./statue/Error";
import Cancel from "./statue/Cancel";
import Build from "./statue/Build";
import Publish from "./statue/Publish";

export default function Deploy() {
  const preRef = useRef();
  const context = useContext(Context);
  const {
    cancel,
    log,
    clearInfo,
    status,
    setStatus,
    serveLog,
    position,
    error,
    setIsDeploy,
    openInBrowser,
    progressValue,
    isCancel,
  } = context;
  var ansi_up = new AnsiUp();

  var html = ansi_up.ansi_to_html(
    log.text == undefined ? "No logs yet..." : log.text
  );

  useEffect(() => {
    if (log.state) {
      setStatus(log.state);
    }
  }, [log.state, log.status]);

  // chack disabled menu
  status !== "publish"
    ? setIsDeploy(true)
    : position === "finish" && setIsDeploy(false);

  if (isCancel || error) {
    setIsDeploy(false);
  }
  // -------------

  useEffect(() => {
    if (!preRef.current) {
      return;
    } else {
      const isScrolledToBottom =
        preRef.current.scrollHeight - preRef.current.clientHeight <=
        preRef.current.scrollTop + 1;
      if (!isScrolledToBottom) {
        preRef.current.scrollTop =
          preRef.current.scrollHeight - preRef.current.clientHeight;
      }
    }
  });
  if (status === "preparation-build" && !isCancel) {
    return <PreparationBuild html={html} cancel={cancel} preRef={preRef} />;
  }
  if (status === "upload-progress" && !isCancel) {
    return <UploadProgress progressValue={progressValue} cancel={cancel} />;
  }
  if (error) {
    return (
      <Error
        html={html}
        serveLog={serveLog}
        clearInfo={clearInfo}
        preRef={preRef}
      />
    );
  }
  if (isCancel) {
    return (
      <Cancel
        html={html}
        serveLog={serveLog}
        clearInfo={clearInfo}
        preRef={preRef}
      />
    );
  }
  if (status === "build" && !isCancel) {
    return <Build html={html} cancel={cancel} preRef={preRef} />;
  }
  if (status === "publish" && !isCancel) {
    return (
      <Publish
        html={html}
        position={position}
        preRef={preRef}
        openInBrowser={openInBrowser}
        clearInfo={clearInfo}
      />
    );
  }
}
