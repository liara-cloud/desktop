import React from "react";
import styled from "styled-components";
import { Node } from "./icon";

export default function AppsItem({ dataApp, setSelected, setShowApps }) {
  const Box = styled.div`
    background: #fafafa;
    width: 290px;
    border: 1px solid #e8e8e8;
    border-radius: 7.5px;
    font-size: 14px;
    position: absolute;
    top: 185px;
    right: 50%;
    transform: translateX(50%);
    z-index: 10;
  `;
  const Item = styled.div`
    width: 278px;
    height: 34px;
    padding-right: 32px;
    transition: 0.3s;
    position: relative;
    margin: 5px auto;
    border-radius: 7.5px;
    line-height: 34px;
    cursor: pointer;
    &:hover {
      color: #fff !important ;
      background: #0070f3;
    }
    svg {
      position: absolute;
      right: 6px;
      top: 6px;
    }
  `;

  return (
    <Box>
      {dataApp.map((item) => (
        <Item
          key={item.name}
          onClick={() => setSelected(item) + setShowApps(false)}
        >
          <span>{item.svg}</span>
          {item.name}
        </Item>
      ))}
    </Box>
  );
}
