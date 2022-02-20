import bytes from "bytes";
import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { toPersianDigits } from "./toPersianDigits";

export default function Progress(props) {
  return (
    <div>
      <div className="CircularProgressbar-box">
        <CircularProgressbar value={parseInt(props.percent)} />
        <span className="CircularProgressbar-value">
          {toPersianDigits(parseInt(props.percent))}%{" "}
        </span>
      </div>
      <div className="upload-size">
        <span>کل: {bytes(props.total)} </span>
        <span>آپلود شده: {bytes(props.upload)}</span>
      </div>
    </div>
  );
}
