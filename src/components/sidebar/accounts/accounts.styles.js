import styled, { css } from "styled-components";
import IRLogo from "../../../assets/images/iran.svg";
import DELogo from "../../../assets/images/germany.svg";

const currentAccountStyle = css`
  background: linear-gradient(92deg, #87fcc420 0%, #28c1f520 98.77%);
  p {
    background: linear-gradient(92deg, #87fcc4 0%, #28c1f5 98.77%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
`;

export const AccountsContainer = styled.div`
  padding: 10px 25px 15px;
  border-bottom: 1px solid #142537;
  overflow-y: scroll;
  max-height: 200px;
`;

export const Account = styled.button`
  position: relative;
  padding: 8px 10px;
  font-size: 14px;
  font-family: "Yekan Bakh";
  border: none;
  color: #d0e0ef;
  width: 100%;
  cursor: pointer;
  text-align: right;
  margin-top: 5px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  background: none;

  ${(props) => props.current && currentAccountStyle}

  &:hover {
    background: linear-gradient(92deg, #87fcc420 0%, #28c1f520 98.77%);
  }
`;
export const AccountAvatar = styled.img`
  width: 35px;
  height: 35px;
  margin-left: 15px;
  border-radius: 50%;
`;

export const BadgeRegion = styled.span`
  width: 14px;
  height: 14px;
  position: absolute;
  right: 35px;
  bottom: 10px;
  border-radius: 50%;
  background-image: url(${(props) => (props.src === "iran" ? IRLogo : DELogo)});
`;
