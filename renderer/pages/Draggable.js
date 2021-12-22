import React from "react";
import { ArrowBottom } from "../components/icon";
import Layout from "../components/Layout";
import DragDrop from "../components/styled/DragDrop";
import User from "../components/User";

export default function Draggable() {
  return (
    <Layout>
      <div dir="rtl">
        <User />
        <DragDrop />
      </div>
    </Layout>
  );
}
