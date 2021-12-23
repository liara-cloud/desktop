import React from "react";
import DragDrop from "./DragDrop";
import Layout from "./Layout";
import User from "./User";
function Draggable() {
  return (
    <Layout>
      <div className="rtl">
        <User />
        <DragDrop />
      </div>
    </Layout>
  );
}
export default Draggable;
