import styled, { css } from "styled-components";

const centerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BlurContainer = styled.div`
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(11.952px);
  position: fixed;
  width: 100vw;
  height: ${props => props.height};
  bottom: 0;
  left: 0;
  z-index: 99;
  ${props => props.justify === "center" && centerStyle};
`;
