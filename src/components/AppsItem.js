import React from "react";

export default function AppsItem({ dataApp, setSelected, setShowApps }) {
  return (
    <div className="box">
      {dataApp.map((item) => (
        <div
          key={item.project_id}
          className="item"
          key={item.name}
          onClick={() => setSelected(item) + setShowApps(false)}
        >
          <img
            className="icon-platform"
            src={require(`../assets/images/svg/${item.type}.svg`).default}
          />
          {item.project_id}
        </div>
      ))}
    </div>
  );
}
