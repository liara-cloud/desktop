import React, { useContext } from "react";
import { Context } from "./contextApi/Context";
import PlatformIcon from "./PlatformIcon";

export default function AppsItem({ item, setSelected, setShowApps }) {
  const { setPort } = useContext(Context);

  const handleSwithApp = () => {
    setSelected(item);
    setShowApps(false);
    setPort("");
  };

  return (
    <div key={item.project_id} className="item" onClick={handleSwithApp}>
      <PlatformIcon platform={item.type} />
      {item.project_id}
    </div>
  );
}
