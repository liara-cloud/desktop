import React from "react";
import { ActionFlexContainer } from "./action-container.styles";

const ActionContainer = ({ children, justifyContent = "space-between" }) => {
  return (
    <ActionFlexContainer justifyContent={justifyContent}>
      {children}
    </ActionFlexContainer>
  );
};

export default ActionContainer;
