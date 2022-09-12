import styled, { css } from "styled-components";

const divElStyle = css`
  display: flex;
  justify-content: center;
`;

export const InfoContainer = styled.textarea`
  margin-top: 15px;
  margin-bottom: 20px;
  direction: ltr;
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  height: 250px;
  max-height: 250px;
  min-height: 250px;
  padding: 10px;
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 19px;
  color: #d0e0ef;
  background: linear-gradient(
    180deg,
    rgba(98, 161, 254, 0.035) 0%,
    rgba(37, 38, 45, 0.31) 100%
  );
  border: 1px solid rgba(161, 201, 238, 0.1);
  border-radius: 20px;
  outline: none;
  ${(props) => props.as == "div" && divElStyle}
`;
