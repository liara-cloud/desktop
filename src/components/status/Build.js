import React from "react";
import { BlueCircle } from "../icon";
import Layout from "../Layout";
import User from "../User";

export default function Build({ html, cancel , preRef}) {
  return (
    <Layout>
      <div dir="rtl">
        <User />
        <div className="deploy ">
          <span className="deploy-icon" style={{ marginBottom: "0" }}>
            <BlueCircle />{" "}
          </span>
          <p>در حال ساخت</p>
          <pre
            readOnly
            ref={preRef}
            id="pre_build"
            placeholder="> Fetching the log code: 0%"
            spellCheck="false"
            dangerouslySetInnerHTML={{ __html: html }}
          ></pre>
          <button className="btn main cancel" onClick={() => cancel()}>
            لغو
          </button>
        </div>
      </div>
    </Layout>
  );
}
