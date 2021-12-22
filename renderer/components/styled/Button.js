import React from "react";
import styled from "styled-components";

export default function Button(props) {
  const Button = styled.button`
    color: white;
    width: 208px;
    height: 38px;
    cursor: pointer;
    font-family: iranyekan;
    font-weight: 400;
    font-size: 16px;
    border-radius: 7.5px;
    border: none;
    background: #0070f3;
    outline: none;
    margin-right: 50%;
    transform: translateX(50%);
    ${props.select &&
    `
      margin-right: auto; 
      font-size: 16px;
      -webkit-transform: inherit; 
      -ms-transform: inherit;
      transform: inherit;
      width: 104px;
      height: 38px;`}
    a {
      font-weight: 400;
      color: white;
      text-decoration: none;
    }
    ${props.main &&
    `
      width :125px !important;
      height : 34px !important;
      margin-right: 0px;
      font-size : 14px;
      transform: inherit;
    `}

    ${props.disabled &&
    `a{
      color : #999999 !important;
    }
    background : #E8E8E8;
    color : #999999 !important;
      `}
    ${props.cancle &&
    `a{
      color : #fff !important;
    }
    background : #EA5167;
    color : #fff !important;
    margin-right: 50%;
    width :125px;
    height : 34px;
    font-size : 14px;
    transform: translateX(50%);
    margin-top : 25px;
      `}
  `;

  return <Button {...props}>{props.children}</Button>;
}
