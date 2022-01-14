import React from "react";
import PlatformIcon from "./PlatformIcon";

export default function AppsItem({ item, setSelected, setShowApps }) {
  return (
    <div
      key={item.project_id}
      className="item"
      key={item.name}
      onClick={() => setSelected(item) + setShowApps(false)}
    >
      {/* <img
        className="icon-platform"
        src={require(`@liara/platformicons/svg/${item.type}.svg`).default}
      /> */}
     
     <PlatformIcon platform={item.type} />
      {item.project_id}
    </div>
  );
}

