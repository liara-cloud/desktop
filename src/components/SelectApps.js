import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppsItem from "./AppsItem";
import { Context } from "./contextApi/Context";
import { ArrowBottom, Node, Tick } from "./icon";
import Layout from "./Layout";
import User from "./User";

function SelectApps() {
  const [showApps, setShowApps] = useState(false);
  const [data, setData] = useState("");

  const context = useContext(Context);
  const {
    accounts,
    selected,
    setSelected,
    port,
    setPort,
    deploy,
    current,
    setFile,
  } = context;

  const api_token = Object.values(accounts).filter((item) => item.current)["0"]
    .api_token;
  useEffect(() => {
    axios
      .get("https://api.iran.liara.ir/v1/projects", {
        headers: {
          Authorization: `Bearer ${api_token}`,
        },
      })
      .then((res) => {
        setData(res.data.projects);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [current]);

  return (
    <Layout>
      <div dir="rtl">
        <User setShowApps={setShowApps} />
        <p className="title">انتخاب برنامه</p>
        <p className="caption">
          ﺑﺮﻧﺎﻣﻪﺍﯼ ﮐﻪ ﻣﯽﺧﻮﺍﻫﯿﺪ ﺩﺭ ﺁﻥ ﺩﯾﭙﻠﻮﯼ ﮐﻨﯿﺪ ﺭﺍ ﺍﻧﺘﺨﺎﺏ ﮐﻨﯿﺪ.
        </p>
        <div className="apps" onClick={() => setShowApps(!showApps)}>
          {selected === "" ? (
            <>
              برنامه ای انتخاب نشده
              <span className="left-icon">
                <ArrowBottom />
              </span>
            </>
          ) : (
            <>
              {data.length > 0 ? (
                <>
                  <img
                    className="icon-platform"
                    src={
                      require(`../assets/images/svg/${selected.type}.svg`)
                        .default
                    }
                  />

                  <span className="name">{selected.project_id}</span>
                  <span className="left-icon">
                    <Tick />
                  </span>
                </>
              ) : (
                "برنامه ای وجود ندارد"
              )}
            </>
          )}
        </div>
        {showApps && data.length > 0 && (
          <div className="box">
            {data.map((item) => (
              <AppsItem
                key={item.project_id}
                item={item}
                setShowApps={setShowApps}
                setSelected={setSelected}
              />
            ))}
          </div>
        )}
        <p className="title">ﺗﻌﯿﯿﻦ ﭘﻮﺭﺕ</p>
        <p className="caption">ﭘﻮﺭﺕ ﻣﻮﺭﺩ ﻧﻈﺮﺗﺎﻥ ﺭﺍ ﻭﺍﺭﺩ ﮐﻨﯿﺪ.</p>
        <input
          value={port}
          onChange={(e) => setPort(e.target.value)}
          className="port"
          type="number"
          placeholder="80"
        />
        <div className="btn-container">
          <Link to="/Deploy">
            <button className="btn main" onClick={() => deploy()}>
              بعدی
            </button>
          </Link>
          <Link to="/Draggable">
            <button className="btn main" onClick={() => setFile("")}>
              قبلی
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
export default SelectApps;
