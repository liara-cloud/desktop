import React from "react";
import { BlueCircle } from "../icon";
import Layout from "../Layout";
import User from "../User";

export default function PreparationBuild({ html, cancel  ,preRef}) {
  return (
    <Layout>
      <div dir="rtl">
        <User />
        <div className="deploy">
          <span className="deploy-icon">
            <BlueCircle />
          </span>
          <p>در حال آماده سازی</p>
          <pre
            readOnly
            ref={preRef}
            placeholder="> Fetching the log code: 0%"
            spellCheck="false"
            dangerouslySetInnerHTML={{ __html: html }}
          ></pre>
          <button className="umami--click--cancel-deploy btn main cancel " onClick={() => cancel()}>
            لغو
          </button>
        </div>
      </div>
    </Layout>
  );
}
