import React from "react";
import styled from "styled-components";

export default function Logo(props) {
  const Logo = styled.div`
    font-size: 22px;
    text-align: center;
    margin-top: 120px;
    height: 40px;
    display: flex;
    margin-bottom: 10px;
    text-align: center;
    justify-content: center;
    span {
      padding-right: 10px;
    }
  `;
  return <Logo>{props.children}</Logo>;
}
