import styled, { css } from "styled-components";

const errorStyle = css`
  background: #ff464624;
  border-color: #ff808088;
  color: #ff8080;
`;

export const DropzoneContainer = styled.div`
  width: 100%;
  border: 1px dashed #757f88;
  border-radius: 16px;
  height: 394px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  ${props => props.hint && `background: #757f8811; `} ${props =>
      props.isError && errorStyle} p {
    direction: rtl;
    line-height: 32px;
    b {
      cursor: pointer;
    }
  }
  input {
    visibility: hidden;
    position: absolute;
  }
`;
