import Link from "next/link";
import styled from "styled-components";
import { Liara } from "../components/icon";
import Layout from "../components/Layout";
import Button from "../components/styled/Button";
import Logo from "../components/styled/Logo";

const Home = () => {
  const Register = styled.span`
    line-height: 50px;
    margin-right: 50%;
    font-size: 14px;
    display: inline-block;
    transform: translateX(50%);
    font-wight: 400;
    a {
      padding-right: 5px;
      text-decoration: none;
      color: black;
    }
  `;

  return (
    <Layout>
      <div dir="rtl">
        <Logo>
          <Liara />
          <span>سرویس ابری لیارا</span>
        </Logo>
        <div>
          <Link href="/Draggable">
            <Button>ورود با مرورگر</Button>
          </Link>
        </div>
        <Register>
          حساب ندارید؟
          <a href="#">وارد شوید</a>
        </Register>
      </div>{" "}
    </Layout>
  );
};

export default Home;
