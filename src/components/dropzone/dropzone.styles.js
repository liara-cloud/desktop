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
  ${props => props.hint && `background: #757f8811 `};
  ${props => props.isError && errorStyle};
  p {
    position: absolute;
    z-index: -1;

    direction: rtl;
    line-height: 32px;
    span {
      background: linear-gradient(92deg, #87fcc420 0%, #28c1f520 98.77%);
      padding: 4px 6px;
      border-radius: 6px;
      margin: 0 5px;
      b {
        background: linear-gradient(92deg, #87fcc4 0%, #28c1f5 98.77%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        cursor: pointer;
      }
    }
  }
  input {
    visibility: hidden;
    position: absolute;
  }
`;
