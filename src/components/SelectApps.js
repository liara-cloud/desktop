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
  const [selected, setSelected] = useState("");
  const [data, setData] = useState("");

  const context = useContext(Context);
  const { account, accounts } = context.cliUser;

  const api_token = Object.values(accounts).filter((item) => item.current)["0"]
    .api_token;
  console.log(api_token);

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
  }, []);
  console.log(data);

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
              ﺑﺮﻧﺎﻣﻪﺍﯼ ﺍﻧﺘﺨﺎﺏ ﻧﺸﺪﻩ
              <span className="left-icon">
                <ArrowBottom />
              </span>
            </>
          ) : (
            <>
              <img
                className="icon-platform"
                src={
                  require(`../assets/images/svg/${selected.type}.svg`).default
                }
              />

              <span className="name">{selected.project_id}</span>
              <span className="left-icon">
                <Tick />
              </span>
            </>
          )}
        </div>
        {showApps && (
          <AppsItem
            dataApp={data}
            setShowApps={setShowApps}
            setSelected={setSelected}
          />
        )}
        <p className="title">ﺗﻌﯿﯿﻦ ﭘﻮﺭﺕ</p>
        <p className="caption">ﭘﻮﺭﺕ ﻣﻮﺭﺩ ﻧﻈﺮﺗﺎﻥ ﺭﺍ ﻭﺍﺭﺩ ﮐﻨﯿﺪ.</p>
        <input className="port" type="number" placeholder="80" />
        <div className="btn-container">
          <Link to="/Deploy">
            <button className="btn main">بعدی</button>
          </Link>
          <Link to="/Draggable">
            <button className="btn main">قبلی</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
export default SelectApps;
