import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import { BlueCircle, GreenCircle, RedCircle } from "../components/icon";
import Layout from "../components/Layout";
import Button from "../components/styled/Button";
import User from "../components/User";

export default function Deploy() {
  const Container = styled.div`
    width: 100%;
    padding: 25px;

    p {
      display: inline-block;
      padding-right: 10px;
      ${(props) =>
        props.variant === "error"
          ? `padding-bottom: 5px;`
          : `padding-bottom: 24px;`}
      font-size: 14px;
      margin-block-start: 0em !important ;
    }
    span {
      display: inline-block;
      color: #999;
      font-size: 12px;
      line-height: 21px;
      margin-bottom: 20px;
    }
    textarea {
      ${(props) =>
        props.variant === "error" ? ` height: 219px;` : ` height: 251px;`}
      width: 285px;
      background: #fafafa;
      border: 1px solid #e8e8e8;
      border-radius: 15px;
      resize: none;
      font-size: 12px;
      direction: ltr;
      outline: none;
      padding: 10px;
      white-space: break-spaces;
    }
    div {
      display: flex;
      justify-content: space-between;
      width: 285px;
      margin: 25px auto 0px;
    }
  `;

  const [status, setStatus] = useState("deploy");
  // deploy - error - success

  if (status === "deploy") {
    return (
      <Layout>
        <div dir="rtl">
          <User />
          <Container>
            <BlueCircle />
            <p>در حال استقرار</p>

            <textarea
              placeholder="> Fetching the source code: 0%"
              spellcheck="false"
            ></textarea>

            <Button cancle>لغو</Button>
          </Container>
        </div>
      </Layout>
    );
  }
  if (status === "error") {
    return (
      <Layout>
        <div dir="rtl">
          <User />
          <Container variant="error">
            <RedCircle />
            <p>ﺍﺳﺘﻘﺮﺍﺭ ﺑﺎ ﺧﻄﺎ ﻣﻮﺍﺟﻪ ﺷﺪ</p>
            <span>
              ﺩﺭ ﺻﻮﺭﺕ ﻧﯿﺎﺯ ﺑﻪ ﭘﺸﺘﯿﺒﺎﻧﯽ، ﻻﮒﻫﺎﯼ ﺍﯾﻦ ﺍﺳﺘﻘﺮﺍﺭ ﺭﺍ ﺩﺭﯾﺎﻓﺖ ﻭ ﺩﺭ ﺗﯿﮑﺖ
              ﭘﯿﻮﺳﺖ ﮐﻨﯿﺪ.
            </span>
            <textarea
              placeholder="> Fetching the source code: 0%"
              spellcheck="false"
            ></textarea>

            <div className="btn-container">
              <Link href="/Deploy">
                <Button main>دریافت لاگ</Button>
              </Link>
              <Link href="/Draggable">
                <Button main>استقرار جدید</Button>
              </Link>
            </div>
          </Container>
        </div>
      </Layout>
    );
  }
  if (status === "success") {
    return (
      <Layout>
        <div dir="rtl">
          <User />
          <Container>
            <GreenCircle />
            <p>ﺍﺳﺘﻘﺮﺍﺭ ﺍﻧﺠﺎﻡ ﺷﺪ</p>
            <textarea
              placeholder="> Fetching the source code: 0%"
              spellcheck="false"
            ></textarea>

            <div className="btn-container">
              <Link href="/Draggable">
                <Button main>نمایش در مرورگر</Button>
              </Link>
              <Link href="/Deploy">
                <Button main>دریافت لاگ</Button>
              </Link>
            </div>
          </Container>
        </div>
      </Layout>
    );
  }
}
