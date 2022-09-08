import React from "react";
import { ButtonContainer } from "./button.styles";

const Button = ({ children, variant = "standard", ...otherProps }) => {
  return (
    <ButtonContainer variant={variant} {...otherProps}>
      <span>{children}</span>
    </ButtonContainer>
  );
};

export default Button;
