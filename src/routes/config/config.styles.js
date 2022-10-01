import styled, { css, keyframes } from "styled-components";

const rotateAnimate = keyframes`
  from {
    transform: rotate(30deg);
  }
  to {
    transform: rotate(360deg);
}`;

const RefatchIconStlye = css`
  animation-name: ${rotateAnimate};
  animation-duration: 1s;
  animation-iteration-count: infinite;
  opacity: 1;
`;

export const AppContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ConfigContainer = styled.div`
  direction: rtl;
  padding-top: 20px;
`;
export const RefetchText = styled.div`
  font-size: 14px;
  text-decoration: underline;
  margin-top: 15px;
  cursor: pointer;
  display: inline-block;
`;

export const RefetchIcon = styled.img`
  cursor: pointer;
  opacity: .7;
  padding: 5px;
  transition: .2s;
  ${props => props.isLoading && RefatchIconStlye};
  &:hover {
    opacity: 1;
    transform: scale(1.1) rotate(30deg);
  }
`;
