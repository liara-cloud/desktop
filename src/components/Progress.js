import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { toPersianDigits } from "./toPersianDigits";

export default function Progress(props) {
  return (
    <div className="CircularProgressbar-box">
      <CircularProgressbar value={parseInt(props.value)} />
      <span className="CircularProgressbar-value">
        {toPersianDigits(parseInt(props.value))}%{" "}
      </span>
    </div>
  );
}
