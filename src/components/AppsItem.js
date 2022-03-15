import React from "react";
import PlatformIcon from "./PlatformIcon";

export default function AppsItem({ item, setSelected, setShowApps }) {
  return (
    <div
      key={item.project_id}
      className="item"
      onClick={() => setSelected(item) + setShowApps(false)}
    >
      <PlatformIcon platform={item.type} />
      {item.project_id}
    </div>
  );
}
