import React from "react";
import left from "../../assets/images/spinner/left.svg";
import right from "../../assets/images/spinner/right.svg";
import top from "../../assets/images/spinner/top.svg";
import { Left, Right, SpinnerContainer, Top } from "./spinner.styles";

const Spinner = () => {
  return (
    <SpinnerContainer>
      <Top src={top} />
      <Left src={left} />
      <Right src={right} />
    </SpinnerContainer>
  );
};

export default Spinner;
