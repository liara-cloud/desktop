import bytes from "bytes";
import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { toPersianDigits } from "./toPersianDigits";

export default function Progress(props) {
  console.log(props);
  return (
    <div>
      <div className="CircularProgressbar-box">
        <CircularProgressbar value={parseInt(props.percent)} />
        <span className="CircularProgressbar-value">
          {toPersianDigits(parseInt(props.percent))}%{" "}
        </span>
      </div>
      <div className="upload-size">
        <span style={{ fontSize: 12, color: "#999999" }}>
          {bytes(props.upload)} /
        </span>
        <span style={{ fontSize: 12, color: "#0070F3" }}>
          {bytes(props.total)}
        </span>
      </div>
    </div>
  );
}
