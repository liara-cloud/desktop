import React, { useContext } from "react";
import { Context } from "./contextApi/Context";
import PlatformIcon from "./PlatformIcon";

export default function AppsItem({ item, setShowApps }) {
  const { setPort, selected, setSelected } = useContext(Context);

  const handleSwithApp = () => {
    setSelected(item);
    setShowApps(false);
    if (item.project_id != selected.project_id) setPort("");
  };

  return (
    <div key={item.project_id} className="item" onClick={handleSwithApp}>
      <PlatformIcon platform={item.type} />
      {item.project_id}
    </div>
  );
}
