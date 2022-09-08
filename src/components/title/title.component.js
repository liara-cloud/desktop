import React, { Fragment } from "react";
import { SubTitle, TitleElement } from "./title.styles";

const Title = ({ text, subtitle }) => {
  return (
    <Fragment>
      <TitleElement>{text}</TitleElement>
      {subtitle && <SubTitle>{subtitle}</SubTitle>}
    </Fragment>
  );
};

export default Title;
