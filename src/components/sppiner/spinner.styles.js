import styled, { keyframes } from "styled-components";

const topMoveAnimate = keyframes`
 0% {top: 0}
 50% {top : -16px}
 100% {top: 0px}
`;
const leftMoveAnimate = keyframes`
 0% {left: 0}
 50% {left : -8px}
 100% {left: 0px}
`;
const rightMoveAnimate = keyframes`
 0% {right: 0}
 50% {right : -8px}
 100% {right: 0px}
`;

export const SpinnerContainer = styled.div`
  position: relative;
  width: 88px;
  height: 95px;
`;

export const Top = styled.img`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  transition: 0.2s;
  animation: ${topMoveAnimate} 2s infinite;
`;
export const Right = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
  transition: 0.2s;
  animation: ${rightMoveAnimate} 2s infinite;
`;
export const Left = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  transition: 0.2s;
  animation: ${leftMoveAnimate} 2s infinite;
`;
