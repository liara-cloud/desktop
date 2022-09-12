import styled, { css } from "styled-components";

const outlinedStyle = css`
  background: transparent;
  border: 1px solid #4fdae1 !important;
  box-shadow: none;
  span {
    background: linear-gradient(92deg, #87fcc4 0%, #28c1f5 98.77%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
`;

const ButtonContainer = styled.button`
  background: linear-gradient(92deg, #87fcc4 0%, #28c1f5 98.77%);
  box-shadow: 0px 0px 20px rgba(130, 128, 255, 0.2);
  color: #111;
  border: none;
  padding: 5px 40px;
  font-size: 14px;
  font-family: "Yekan Bakh";
  display: block;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  ${(props) => props.variant === "outlined" && outlinedStyle};
`;

export { ButtonContainer };
