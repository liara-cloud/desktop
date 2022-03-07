import React from "react";
import { BlueCircle } from "../icon";
import Layout from "../Layout";
import Progress from "../Progress";
import User from "../User";

export default function UploadProgress({ progressValue, cancel }) {
  return (
    <Layout>
      <div dir="rtl">
        <User />
        <div className="deploy">
          <span className="deploy-icon" style={{ marginBottom: "0" }}>
            <BlueCircle />{" "}
          </span>
          <p style={{ paddingBottom: "0" }}>در حال آپلود سورس کد</p>
          <span>
            شما میتوانید با استفاده از فایل gitignore. حجم فایل آپلودی را کاهش
            دهید{" "}
          </span>
        </div>
        <Progress
          percent={progressValue.percent}
          total={progressValue.total}
          upload={progressValue.upload}
        />
        <button className="btn main cancel" onClick={() => cancel()}>
          لغو
        </button>
      </div>
    </Layout>
  );
}
