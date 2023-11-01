import styled from "styled-components";

export const LayoutDeployContainer = styled.div`
  height: 400px;
  width: 100%;
  direction: rtl;
  display: flex;
  align-items: end;

  div {
    width: 100%;
  }
`;

export const ResizeButton = styled.button`
  display: flex;
  color: #fff;
  gap: 5px;
  align-items: center;
  background: #2f3e4d;
  padding: 2px 10px;
  border-radius: 12px;
  position: absolute;
  z-index: 2;
  top: 10px;
  right: 10px;
  font-size: 10px;
  direction: rtl;
  cursor: pointer;
  img {
    width: 9px;
  }
`;
