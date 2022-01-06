import { Link } from "react-router-dom";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BlueCircle, GreenCircle, RedCircle } from "../components/icon";
import Layout from "../components/Layout";
import User from "../components/User";
import { Context } from "./contextApi/Context";
import { AnsiUp } from "ansi-up";

export default function Deploy() {
  const [status, setStatus] = useState("deploy");
  // deploy - error - success

  const ref = useRef();

  const context = useContext(Context);
  const { log, clearInfo } = context;

  var ansi_up = new AnsiUp();

  var html = ansi_up.ansi_to_html(
    log.text == undefined ? "Deploy..." : log.text
  );
  console.log(log);
  useEffect(() => {
    log.status === "error" && setStatus("error");
    log.status === "done" && setStatus("success");
  }, [log.status]);

  if (status === "deploy") {
    return (
      <Layout>
        <div dir="rtl">
          <User />
          <div className="deploy">
            <span className="deploy-icon">
              <BlueCircle />
            </span>
            <p>در حال استقرار</p>
            <pre
              readOnly
              ref={ref}
              placeholder="> Fetching the log code: 0%"
              spellCheck="false"
              dangerouslySetInnerHTML={{ __html: html }}
            ></pre>
            <button className="btn cancle">لغو</button>
          </div>
        </div>
      </Layout>
    );
  }
  if (status === "error") {
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
              readOnly
              placeholder="> Fetching the log code: 0%"
              spellCheck="false"
              dangerouslySetInnerHTML={{ __html: html }}
            ></pre>

            <div className="btn-container">
              <Link to="/Deploy">
                <button className="btn main">دریافت لاگ</button>
              </Link>
              <Link to="/Draggable">
                <button className="btn main" onClick={clearInfo()}>
                  استقرار جدید
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  if (status === "success") {
    return (
      <Layout>
        <div dir="rtl">
          <User />
          <div className="deploy ">
            <GreenCircle />
            <p>ﺍﺳﺘﻘﺮﺍﺭ ﺍﻧﺠﺎﻡ ﺷﺪ</p>
            <pre
              readOnly
              placeholder="> Fetching the log code: 0%"
              spellCheck="false"
              dangerouslySetInnerHTML={{ __html: html }}
            ></pre>

            <div className="btn-container">
              <Link to="/Draggable">
                <button className="btn main">نمایش در مرورگر</button>
              </Link>
              <Link
                to="/Deploy"
                onClick={() => {
                }}
              >
                <button className="btn main">دریافت لاگ</button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
