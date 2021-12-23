import React from "react";
import { Link } from "react-router-dom";
import { Liara } from "./icon";
import Layout from "./Layout";

const Home = () => {
  return (
    <Layout>
      <div dir="rtl">
        <div className="logo">
          <Liara />
          <span>سرویس ابری لیارا</span>
        </div>
        <div>
          <Link to="/Draggable">
            <button className="btn">ورود با مرورگر</button>
          </Link>
        </div>
        <span className="register">
          حساب ندارید؟
          <a href="#">وارد شوید</a>
        </span>
      </div>
    </Layout>
  );
};

export default Home;
