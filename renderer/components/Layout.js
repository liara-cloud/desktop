import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import GlobalStyle from "./styled/globalStyle";

export default function Layout(props) {
  const Version = styled.p`
    color: #999;
    font-size: 12px;
    position: fixed;
    bottom: 10px;
    left: 15px;
    font-wight: 200;
  `;
  const Support = styled.a`
    color: #999;
    font-size: 12px;
    position: fixed;
    bottom: 10px;
    right: 15px;
    font-wight: 200;
  `;
  console.log(useRouter().pathname);
  return (
    <div>
      <GlobalStyle />
      {props.children}
      <Version>نسخه 1.0.0</Version>
      {useRouter().pathname !== "/" && (
        <Support href="#">ارتباط با پشتیبانی</Support>
      )}
    </div>
  );
}
