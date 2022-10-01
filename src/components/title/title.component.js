import React from "react";
import { SubTitle, TitleContainer, TitleElement } from "./title.styles";

const Title = ({ text, subtitle, error, children }) => {
  return (
    <div>
      <TitleContainer>
        <TitleElement>
          {text}
        </TitleElement>
        {children}
      </TitleContainer>
      {subtitle &&
        <SubTitle style={error ? { color: "#FF6C6C" } : {}}>
          {subtitle}
        </SubTitle>}
    </div>
  );
};

export default Title;
