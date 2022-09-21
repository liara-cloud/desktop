import styled, { css, keyframes } from "styled-components";

const rotateAnimate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
}`;

const RefatchIconStlye = css`
  animation-name: ${rotateAnimate};
  animation-duration: 1s;
  animation-iteration-count: infinite;
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

export const RefetchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background: linear-gradient(92deg, #87fcc415 0%, #28c1f515 98.77%);
  cursor: pointer;
  border-radius: 6px;
`;

export const RefetchIcon = styled.img`
  ${props => props.isLoading && RefatchIconStlye};
`;
