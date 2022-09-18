import React from "react";
import { SubTitle, TitleElement } from "./title.styles";

const Title = ({ text, subtitle, error }) => {
  return (
    <div>
      <TitleElement>
        {text}
      </TitleElement>
      {subtitle &&
        <SubTitle style={error ? { color: "#FF6C6C" } : {}}>
          {subtitle}
        </SubTitle>}
    </div>
  );
};

export default Title;
