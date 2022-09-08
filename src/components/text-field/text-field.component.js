import React from "react";
import { InputContainer } from "./text-field.styles";

const TextField = ({ ...otherProps }) => {
  return <InputContainer {...otherProps} />;
};

export default TextField;
