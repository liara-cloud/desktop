import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import styled from "styled-components";
import Layout from "../Layout";
import Button from "./Button";

export default function DragDrop() {
  const [file, setFile] = useState("");
  const handleChange = (file) => {
    setFile(file);
  };

  const DragDrop = styled.div`
    width: 300px;
    overflow: hidden;
    height: 379px;
    border-radius: 15px;
    margin: 23px auto;
    position: relative;
    border: 1px dashed #999999;
    label {
      width: 100%;
      height: 100%;
      border: none;
      &: hover {
        border: none;
      }
      svg {
        display: none;
      }
      span {
        display: none;
      }
    }
  `;
  const Select = styled.div`
    position: absolute;
    top: 30%;
    line-height: 50px;
    font-size: 18px;
    white-space: nowrap;
    z-index: -1;
    right: 50%;
    text-align: center;
    transform: translateX(50%);
  `;
  file !== "" && useRouter().push("/SelectApps");
  return (
    <Layout>
      <DragDrop>
        <FileUploader handleChange={handleChange} name="file" />
        <Select>
          <p>پروژه رو در اینجا رها کنید</p>
          <span>
            {" "}
            و یا <Button select>انتخاب کنید</Button>
          </span>
        </Select>
      </DragDrop>
    </Layout>
  );
}
