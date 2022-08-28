import styled, { css } from "styled-components";

export const DropzoneContainer = styled.div`
  width: 100%;
  border: 1px dashed #757f88;
  border-radius: 16px;
  height: 394px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => props.isDragActive && `background: #757f8811; `}
  p {
    direction: rtl;
    line-height: 32px;
    b {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;
