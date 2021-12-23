import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppsItem from "./AppsItem";
import { ArrowBottom, Node, Tick } from "./icon";
import Layout from "./Layout";
import User from "./User";


function SelectApps() {
  const data = [
    { name: "node-app", svg: <Node /> },
    { name: "my-admin-app", svg: <Node /> },
  ];

  const [showApps, setShowApps] = useState(false);
  const [selected, setSelected] = useState("");

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
              <span className="selected">{selected.svg}</span>
              <span className="name">{selected.name}</span>
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
            <button className="btn main" >
              بعدی
            </button>
          </Link>
          <Link to="/Draggable">
            <button className="btn main" >
              قبلی
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
export default SelectApps;
