import React from "react";


export default function AppsItem({ dataApp, setSelected, setShowApps }) {
  return (
    <div className="box">
      {dataApp.map((item) => (
        <div
          className="item"
          key={item.name}
          onClick={() => setSelected(item) + setShowApps(false)}
        >
          <span>{item.svg}</span>
          {item.name}
        </div>
      ))}
    </div>
  );
}
