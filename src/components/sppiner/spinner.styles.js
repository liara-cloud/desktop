import styled, { keyframes } from "styled-components";

const topMoveAnimate = keyframes`
 0% {  transform: translate(-50% , 0);left: 50%;}
 50% { transform: translate(-50% , -16px);left: 50%;}
 100% { transform: translate(-50% , 0);left: 50%;}
`;
const leftMoveAnimate = keyframes`
0% {transform: translateX(0)}
50% {transform: translateX(-8px)}
100% {transform: translateX(0)}
`;
const rightMoveAnimate = keyframes`
 0% {transform: translateX(0)}
 50% {transform: translateX(8px)}
 100% {transform: translateX(0)}
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
