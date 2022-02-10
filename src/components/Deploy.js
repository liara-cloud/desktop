import { Link } from "react-router-dom";
import React, { useContext, useEffect, useRef, useState } from "react";
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
import Progress from "./Progress";

export default function Deploy() {
  const preRef = useRef();
  const context = useContext(Context);
  const {
    cancel,
    log,
    clearInfo,
    status,
    setStatus,
    serveLog,
    position,
    error,
    setIsDeploy,
    openInBrowser,
    progressValue,
    isCancel,
  } = context;
  var ansi_up = new AnsiUp();

  var html = ansi_up.ansi_to_html(
    log.text == undefined ? "Deploy..." : log.text
  );

  useEffect(() => {
    if (log.state) {
      setStatus(log.state);
      setIsDeploy(false);
    }
  }, [log.state, log.status]);

  useEffect(() => {
    if (!preRef.current) {
      return;
    } else {
      const isScrolledToBottom =
        preRef.current.scrollHeight - preRef.current.clientHeight <=
        preRef.current.scrollTop + 1;
      if (!isScrolledToBottom) {
        preRef.current.scrollTop =
          preRef.current.scrollHeight - preRef.current.clientHeight;
      }
    }
  });

  if (status === "preparation-build" && !isCancel) {
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
            <button className="btn main cancel " onClick={() => cancel()}>
              لغو
            </button>
          </div>
        </div>
      </Layout>
    );
  }
  if (status === "upload-progress" && !isCancel) {
    return (
      <Layout>
        <div dir="rtl">
          <User />
          <div className="deploy">
            <span className="deploy-icon" style={{ marginBottom: "0" }}>
              <BlueCircle />{" "}
            </span>
            <p style={{ paddingBottom: "0" }}>در حال آپلود سورس کد</p>
            <span>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت ایپسوم
            </span>
          </div>
          <Progress value={progressValue} />
          <button className="btn main cancel" onClick={() => cancel()}>
            لغو
          </button>
        </div>
      </Layout>
    );
  }
  if (error) {
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
                <button
                  className="btn main primary"
                  onClick={() => clearInfo()}
                >
                  استقرار جدید
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  if (isCancel) {
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
                <button
                  className="btn main primary"
                  onClick={() => clearInfo()}
                >
                  استقرار جدید
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  if (status === "build" && !isCancel) {
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
  if (status === "publish" && !isCancel) {
    return (
      <Layout>
        <div dir="rtl">
          <User />
          <div className="deploy ">
            {position === "finish" ? (
              <>
                <GreenCircle />
                <p>استقرار انجام شد</p>
              </>
            ) : (
              <>
                <span className="deploy-icon" style={{ marginBottom: "0" }}>
                  <BlueCircle />
                </span>
                <p>در حال انتشار</p>
              </>
            )}

            <pre
              readOnly
              ref={preRef}
              id="pre_build"
              placeholder="> Fetching the log code: 0%"
              spellCheck="false"
              dangerouslySetInnerHTML={{ __html: html }}
            ></pre>

            {position === "finish" ? (
              <div className="btn-container">
                <button
                  className="btn main primary"
                  onClick={() => openInBrowser()}
                >
                  نمایش در مرورگر
                </button>
                <Link to="/Draggable">
                  <button
                    className="btn main primary"
                    onClick={() => clearInfo()}
                  >
                    استقرار جدید
                  </button>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </Layout>
    );
  }
}
