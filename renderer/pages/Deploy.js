import React from "react";
import styled from "styled-components";
import { BlueCircle } from "../components/icon";
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
      padding-bottom: 24px;
      margin-block-start: 0em !important ;
    }
    textarea {
      width: 280px;
      height: 251px;
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
  `;

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
