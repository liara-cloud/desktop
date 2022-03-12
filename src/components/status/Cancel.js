import React from "react";
import { Link } from "react-router-dom";
import { GreyCircle } from "../icon";
import Layout from "../Layout";
import User from "../User";

export default function Cancel({ html, serveLog, clearInfo, preRef }) {
  return (
    <Layout>
      <div dir="rtl">
        <User />
        <div className="deploy">
          <GreyCircle />
          <p>ﺍﺳﺘﻘﺮﺍﺭ لغو ﺷﺪ</p>
          <pre
            readOnly
            ref={preRef}
            placeholder="> Fetching the log code: 0%"
            spellCheck="false"
            dangerouslySetInnerHTML={{ __html: html }}
          ></pre>
          <div className="btn-container">
            <button className="btn main primary" onClick={() => serveLog()}>
              دریافت لاگ
            </button>

            <Link to="/Draggable">
              <button className="btn main hint" onClick={() => clearInfo()}>
                استقرار جدید
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
