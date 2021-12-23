import { Link } from "react-router-dom";
import React, { useState } from "react";
import { BlueCircle, GreenCircle, RedCircle } from "../components/icon";
import Layout from "../components/Layout";
import User from "../components/User";

export default function Deploy() {
  const [status, setStatus] = useState("error");
  // deploy - error - success

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
            <textarea
              placeholder="> Fetching the source code: 0%"
              spellcheck="false"
            ></textarea>
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
            <textarea
              placeholder="> Fetching the source code: 0%"
              spellcheck="false"
            ></textarea>

            <div className="btn-container">
              <Link to="/Deploy">
                <button className="btn main">دریافت لاگ</button>
              </Link>
              <Link to="/Draggable">
                <button className="btn main">استقرار جدید</button>
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
            <textarea
              placeholder="> Fetching the source code: 0%"
              spellcheck="false"
            ></textarea>

            <div className="btn-container">
              <Link to="/Draggable">
                <button className="btn main">نمایش در مرورگر</button>
              </Link>
              <Link to="/Deploy">
                <button className="btn main">دریافت لاگ</button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
