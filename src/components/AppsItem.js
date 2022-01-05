import React from "react";

export default function AppsItem({ item, setSelected, setShowApps }) {
  return (
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
  );
}
