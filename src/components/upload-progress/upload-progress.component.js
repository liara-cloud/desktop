import React, { useEffect } from "react";
import { useState } from "react";

import { useSelector } from "react-redux";
import byteSize from "../../utility/byte-size.utlis";
import UploadInfo from "../upload-info/upload-info.component";
import {
  LoadedContainer,
  Progress,
  UploadDetails,
  ValueContainer
} from "./upload-progress.styles";
const UploadProgress = () => {
  const { percent, total, transferred } = useSelector(state => state.deploy);

  const rounded = percent ? Math.round(percent) : 0;
  const value = rounded / 100 * 180;

  return (
    <UploadInfo as="div" style={{ overflow: "none" }}>
      <LoadedContainer>
        <Progress>
          <li style={{ transform: `rotate(${value}deg)` }} />
        </Progress>

        <ValueContainer>
          {rounded}%
        </ValueContainer>

        <UploadDetails>
          <div>
            <p>کل: </p> <span> {byteSize(total || 0)} </span>
          </div>
          <div>
            <p>آپلود شده: </p> <span> {byteSize(transferred || 0)} </span>
          </div>
        </UploadDetails>
      </LoadedContainer>
    </UploadInfo>
  );
};

export default UploadProgress;
