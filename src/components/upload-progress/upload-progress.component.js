import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import byteSize from "../../utility/byteSize.utlis";
import UploadInfo from "../upload-info/upload-info.component";
import {
  LoadedContainer,
  Progress,
  UploadDetails,
  ValueContainer
} from "./upload-progress.styles";

const UploadProgress = () => {
  const { percent, total, transferred } = useSelector((state) => state.deploy);

  const rounded = percent ? Math.round(percent) : 0;
  const value = (rounded / 100) * 180;

  return (
    <UploadInfo as="div" style={{ overflow: "none" }}>
      <LoadedContainer>
        <div>
          <Progress rotate={value}>
            <li />
          </Progress>
          <ValueContainer>{rounded}%</ValueContainer>
        </div>
        <UploadDetails>
          <div>
            <p>کل: </p> <span> {byteSize(total)} </span>
          </div>
          <div>
            <p>آپلود شده: </p> <span> {byteSize(transferred)} </span>
          </div>
        </UploadDetails>
      </LoadedContainer>
    </UploadInfo>
  );
};

export default UploadProgress;
