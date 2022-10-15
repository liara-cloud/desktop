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

  button.close {
    direction: rtl;
    position: absolute;
    bottom: 100px;
    left: 25px;
    padding: 4px 12px;
    border: 1px solid #fff;
    font-size: 12px;
    cursor: pointer;
    color: #fff;
    border-radius: 6px;
    opacity: .6;

    &:hover {
      opacity: 1;
    }
  }
`;
