import React from "react";
import { Link } from "react-router-dom";
import { BlueCircle, GreenCircle } from "../icon";
import Layout from "../Layout";
import User from "../User";

export default function Publish({
  html,
  position,
  preRef,
  openInBrowser,
  clearInfo,
}) {
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
              <button className="btn main hint" onClick={() => openInBrowser()}>
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
