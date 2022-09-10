import styled, { keyframes } from "styled-components";
import percentageContainer from "../../assets/images/percentage-container.svg";

const rotateAnimation = (rotate = 0) => keyframes`
    100% {
      transform: rotate(${rotate}deg);
    }
  `;

export const SemiContainer = styled.div`
  margin-top: -45px;
`;

export const Progress = styled.ul`
  margin: 0 auto;
  position: relative;
  width: 190px;
  height: 95px;
  overflow: hidden;
  &:after {
    position: absolute;
    content: "";
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);
    font-size: 1.1rem;
    font-weight: bold;
    color: transparent;
  }
  &:before {
    box-sizing: border-box;
    position: absolute;
    content: "";
    width: inherit; /*inherits from its parent element*/
    height: inherit;
    border: 35px solid rgba(211, 211, 211, 0.3);
    border-bottom: none;
    border-top-left-radius: 175px;
    border-top-right-radius: 175px;
  }

  li {
    position: absolute;
    top: 100%;
    left: 0;
    width: inherit;
    height: inherit;
    border: 35px solid;
    border-top: none;
    border-bottom-left-radius: 175px;
    border-bottom-right-radius: 175px;
    transform-origin: 50% 0;
    z-index: 4;
    border-color: #50dae1;
    animation-name: ${(props) => rotateAnimation(props.rotate)};
    animation-fill-mode: forwards;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    backface-visibility: hidden;
  }
`;

export const ValueContainer = styled.div`
  background-image: url(${percentageContainer});
  height: 35px;
  width: 208px !important;
  bottom: 50px;
  z-index: 23;
  background-repeat: no-repeat;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  padding-top: 5px;
`;
