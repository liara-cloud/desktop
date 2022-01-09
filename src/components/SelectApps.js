import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppsItem from "./AppsItem";
import { Context } from "./contextApi/Context";
import { ArrowBottom, Node, Tick } from "./icon";
import Layout from "./Layout";
import User from "./User";

function SelectApps(props) {
  const [data, setData] = useState("");

  const context = useContext(Context);
  const {
    accounts,
    selected,
    setSelected,
    port,
    setPort,
    showApps,
    setShowApps,
    deploy,
    current,
    disabled,
    setFile,
    defaultPort,
    check,
    setCheck,
  } = context;

  //  keyCode - Use keyboard keys
  //  Enter(13)

  document.addEventListener("keydown", (event) => {
    let unicode = event.keyCode;
    if (
      props.history.location.pathname === "/SelectApps" &&
      port != "" &&
      selected != ""
    ) {
      if (unicode === 13) {
        props.history.push("/Deploy");
        deploy();
      }
    }
  });

  // ***************

  useEffect(() => {
    setCheck(true);
    if (Object.values(accounts).length == 0) {
      props.history.push("/");
    }

    const api_token = Object.values(accounts).filter((item) => item.current)[
      "0"
    ].api_token;

    axios
      .get("https://api.iran.liara.ir/v1/projects", {
        headers: {
          Authorization: `Bearer ${api_token}`,
        },
      })

      .then((res) => {
        setData(res.data.projects);
        setCheck(false);
      })

      .catch((error) => {
        console.error(error);
      });
  }, [current]);

  return (
    <Layout>
      <div dir="rtl">
        {check && check && (
          <div className="load-container">
            <span className="load"></span> <span className="background"></span>
          </div>
        )}
        <User />
        <p className="title">انتخاب برنامه</p>
        <p className="caption">
          ﺑﺮﻧﺎﻣﻪﺍﯼ ﮐﻪ ﻣﯽﺧﻮﺍﻫﯿﺪ ﺩﺭ ﺁﻥ ﺩﯾﭙﻠﻮﯼ ﮐﻨﯿﺪ ﺭﺍ ﺍﻧﺘﺨﺎﺏ ﮐﻨﯿﺪ.
        </p>
        <div
          className="apps"
          onClick={() => setShowApps(!showApps) + console.log(showApps)}
        >
          {selected === "" && data.length > 0 ? (
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
        {defaultPort.length === 0 && (
          <>
            <p className="title">ﺗﻌﯿﯿﻦ ﭘﻮﺭﺕ</p>
            <p className="caption">ﭘﻮﺭﺕ ﻣﻮﺭﺩ ﻧﻈﺮﺗﺎﻥ ﺭﺍ ﻭﺍﺭﺩ ﮐﻨﯿﺪ.</p>
            <input
              value={port}
              disabled={disabled}
              onChange={(e) => setPort(e.target.value)}
              className="port"
              type="number"
              placeholder="80"
            />
          </>
        )}
        <div
          className="btn-container"
          style={{
            position: "absolute",
            bottom: 55,
          }}
        >
          {port != "" && selected != "" ? (
            <Link to="/Deploy">
              <button className="btn main primary" onClick={() => deploy()}>
                بعدی
              </button>
            </Link>
          ) : (
            <button className="btn main primary">بعدی</button>
          )}
          <Link to="/Draggable">
            <button className="btn main primary" onClick={() => setFile("")}>
              قبلی
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
export default SelectApps;
