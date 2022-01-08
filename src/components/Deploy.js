import { Link } from "react-router-dom";
import React, { useContext, useEffect, useRef } from "react";
import {
  BlueCircle,
  GreenCircle,
  GreyCircle,
  RedCircle,
} from "../components/icon";
import Layout from "../components/Layout";
import User from "../components/User";
import { Context } from "./contextApi/Context";
import { AnsiUp } from "ansi-up";

export default function Deploy() {
  // deploy - error - success - cancel

  const ref = useRef();

  const context = useContext(Context);

  const {
    cancel,
    log,
    clearInfo,
    status,
    setStatus,
    serveLog,
    setIsDeploy,
    openInBrowser,
  } = context;
  var ansi_up = new AnsiUp();

  var html = ansi_up.ansi_to_html(
    log.text == undefined ? "Deploy..." : log.text
  );

  useEffect(() => {
    if (log.status === "error") {
      setStatus("error");
      setIsDeploy(false);
    } else if (log.status === "done") {
      setStatus("success");
      setIsDeploy(false);
    } else if (log.status === "cancel") {
      setStatus("cancel");
      setIsDeploy(false);
    }
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
            <button className="btn cancle" onClick={() => cancel()}>
              لغو
            </button>
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
              <button className="btn main" onClick={() => serveLog()}>
                دریافت لاگ
              </button>
              <Link to="/Draggable">
                <button className="btn main" onClick={() => clearInfo()}>
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
              <button className="btn main" onClick={() => openInBrowser()}>
                نمایش در مرورگر
              </button>

              <button className="btn main " onClick={() => serveLog()}>
                دریافت لاگ
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  if (status === "cancel") {
    return (
      <Layout>
        <div dir="rtl">
          <User />
          <div className="deploy ">
            <GreyCircle />
            <p>ﺍﺳﺘﻘﺮﺍﺭ لغو ﺷﺪ</p>
            <pre
              readOnly
              placeholder="> Fetching the log code: 0%"
              spellCheck="false"
              dangerouslySetInnerHTML={{ __html: html }}
            ></pre>

            <div className="btn-container">
              <button className="btn main" onClick={() => serveLog()}>
                دریافت لاگ
              </button>

              <Link to="/Draggable">
                <button className="btn main" onClick={() => clearInfo()}>
                  استقرار جدید
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
