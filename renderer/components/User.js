import React, { useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import styled from "styled-components";
import { ArrowBottom, German, Iran } from "../components/icon";
export default function User({ setShowApps }) {
  const UserItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    marign-top: 5px;
    margin-bottom: 5px;
    margin-top: 19px;
    img {
      border-radius: 50%;
      margin-left: 10px;
      width: 32px;
      height: 32px;
    }
    p {
      display: inline-block;
      margin-left: 5px;
      font-size: 14px;
      cursor: pointer;
    }
    span {
      cursor: pointer;
    }
    .region {
      position: absolute;
      right: 50px;
      top: 22px;

      svg {
        border-radius: 50%;
      }
    }

    ${(props) =>
      props.variant === "menuItem" &&
      `
        border-radius: 7.5px;
        width: 189px;
        height: 45px;
        line-height: 45px;
        margin-right: 50% !important;
        transform: translateX(50%);
        margin-bottom: 5px !important;
        &:hover {
          background-color: #0070f3;
          color: #fff;
        }
        .region {
          position: absolute;
          right: 40px;
          top: 15px; 
        }
        
        `}
    ${(props) =>
      props.variant === "carrent" &&
      ` 
          height: 45px;
          color :#0070f3 ;
          margin-top: 3px !important;
     `}
  `;
  const Menu = styled.div`
    position: absolute;
    left: 50%;
    z-index: 3;
    transform: translateX(-50%);
    transition: all 0.2s;
    background: #fafafa;
    width: 208px;
    height: 200px;
    background: #fafafa;
    border: 1px solid #e8e8e8;
    border-radius: 10px;

    a.exit {
      border-radius: 7.5px;
      text-align: center;
      display: inline-block;
      margin-right: 50%;
      transform: translateX(50%);
      color: #303030;
      text-decoration: none;
      width: 189px;
      font-size: 14px;
      height: 45px;
      line-height: 45px;
      &:hover {
        background-color: #0070f3;
        color: #fff;
      }
    }
  `;

  const Add = styled.a`
    white-space: nowrap;
    background: #e8e8e8;
    height: 45px;
    width: 189px;
    text-align: center;
    line-height: 45px;
    border-radius: 7.5px;
    color: #303030;
    text-decoration: none;
    font-size: 14px;
    display: inline-block;
    margin-right: 50%;
    transform: translateX(50%);
    marign-top: 5px;
    margin-bottom: 5px;

    &:hover {
      background-color: #0070f3;
      color: #fff;
    }
  `;

  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  if (menu === true) {
    setShowApps(false);
  }

  return (
    <Fragment>
      <UserItem onClick={handleMenu}>
        <img src="../static/images/person.jpg" />
        <p>نام و نام خانوادگی</p>
        <span>
          <ArrowBottom />
        </span>
      </UserItem>
      {menu && (
        <Menu>
          <UserItem variant="carrent" style={{ margin: 0 }}>
            <img src="../static/images/person.jpg" />
            <span className="region">
              <Iran />
            </span>
            <p>نام و نام خانوادگی</p>
          </UserItem>
          <UserItem variant="menuItem" style={{ margin: 0 }}>
            <img src="../static/images/person.jpg" />
            <p>نام و نام خانوادگی</p>
            <span className="region">
              <German />
            </span>
          </UserItem>
          <Add href="#">افزودن حساب کاربری</Add>
          <a className="exit" href="/SelectApps">
            خروج
          </a>
        </Menu>
      )}
    </Fragment>
  );
}
