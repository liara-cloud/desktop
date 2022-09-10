import React from "react";
import { useSelector } from "react-redux";
import UploadInfo from "../upload-info/upload-info.component";
import {
  Progress,
  SemiContainer,
  ValueContainer
} from "./upload-progress.styles";

const UploadProgress = () => {
  const { percent } = useSelector((state) => state.deploy);
  const rounded = percent && Math.round(percent);
  const value = (rounded / 100) * 180;

  console.log({ rounded, percent });

  return (
    <UploadInfo as="div">
      <SemiContainer>
        <Progress rotate={value}>
          <li />
        </Progress>
        <ValueContainer>{rounded}%</ValueContainer>
      </SemiContainer>
    </UploadInfo>
  );
};

export default UploadProgress;
