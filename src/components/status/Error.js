import React from "react";
import { Link } from "react-router-dom";
import { RedCircle } from "../icon";
import Layout from "../Layout";
import User from "../User";

export default function Error({ html, serveLog, clearInfo, preRef }) {
  return (
    <Layout>
      <div dir="rtl">
        <User />
        <div className="deploy error">
          <RedCircle />
          <p>ﺍﺳﺘﻘﺮﺍﺭ ﺑﺎ ﺧﻄﺎ ﻣﻮﺍﺟﻪ ﺷﺪ</p>
          <span>
            ﺩﺭ ﺻﻮﺭﺕ ﻧﯿﺎﺯ ﺑﻪ ﭘﺸﺘﯿﺒﺎﻧﯽ، ﻻﮒﻫﺎﯼ ﺍﯾﻦ ﺍﺳﺘﻘﺮﺍﺭ ﺭﺍ ﺩﺭﯾﺎﻓﺖ ﻭ ﺩﺭ ﺗﯿﮑﺖ
            ﭘﯿﻮﺳﺖ ﮐﻨﯿﺪ.
          </span>
          <pre
            ref={preRef}
            readOnly
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
