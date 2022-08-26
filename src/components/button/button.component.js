import React from 'react'
import { ButtonContainer } from "./button.styles";

const Button = ({ children, variant = "standard", ...otherProps }) => {
  return <ButtonContainer {...otherProps}>{children}</ButtonContainer>;
};

export default Button;
