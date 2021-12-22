import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import AppsItem from "../components/AppsItem";
import { ArrowBottom, Node, Tick } from "../components/icon";
import Layout from "../components/Layout";
import Button from "../components/styled/Button";
import GlobalStyle from "../components/styled/globalStyle";
import SelectAppsStyled from "../components/styled/SelectAppsStyled";
import User from "../components/User";

export default function SelectApps() {
  const Apps = styled.div`
    width: 290px;
    height: 34px;
    background: #fafbfc;
    cursor: pointer;
    border: 1px solid #e8e8e8;
    border-radius: 7.5px;
    margin-right: 50%;
    transform: translateX(50%);
    margin-top: 24px;
    line-height: 34px;
    margin-bottom: 55px;
    padding-right: 8px;
    font-size: 14px;
    span.left-icon {
      float: left;
      padding-left: 10px;
      padding-top: 2px;
    }
    logo svg {
      margin-top: 10px;
    }
    name {
      margin-top: -5px;
      position: absolute;
      top: 6px;
      right: 38px;
    }
    span.selected {
      svg {
        margin-top: 6px;
      }
    }
  `;

  const data = [
    { name: "node-app", svg: <Node /> },
    { name: "my-admin-app", svg: <Node /> },
  ];

  const [showApps, setShowApps] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <Layout>
      <SelectAppsStyled />
      <GlobalStyle />
      <div dir="rtl">
        <User />
        <p className="title">انتخاب برنامه</p>
        <p className="caption">
          ﺑﺮﻧﺎﻣﻪﺍﯼ ﮐﻪ ﻣﯽﺧﻮﺍﻫﯿﺪ ﺩﺭ ﺁﻥ ﺩﯾﭙﻠﻮﯼ ﮐﻨﯿﺪ ﺭﺍ ﺍﻧﺘﺨﺎﺏ ﮐﻨﯿﺪ.
        </p>
        <Apps onClick={() => setShowApps(!showApps)}>
          {selected === "" ? (
            <>
              ﺑﺮﻧﺎﻣﻪﺍﯼ ﺍﻧﺘﺨﺎﺏ ﻧﺸﺪﻩ
              <span className="left-icon">
                <ArrowBottom />
              </span>
            </>
          ) : (
            <>
              <span className="selected">{selected.svg}</span>
              <name>{selected.name}</name>
              <span className="left-icon">
                <Tick />
              </span>
            </>
          )}
        </Apps>
        {showApps && (
          <AppsItem
            dataApp={data}
            setShowApps={setShowApps}
            setSelected={setSelected}
          />
        )}
        <p className="title">ﺗﻌﯿﯿﻦ ﭘﻮﺭﺕ</p>
        <p className="caption">ﭘﻮﺭﺕ ﻣﻮﺭﺩ ﻧﻈﺮﺗﺎﻥ ﺭﺍ ﻭﺍﺭﺩ ﮐﻨﯿﺪ.</p>
        <input className="port" type="number" placeholder="80" />
        <div className="btn-container">
          <Link href="/Deploy">
            <Button main>بعدی</Button>
          </Link>
          <Link href="/Draggable">
            <Button main>قبلی</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
