import React, { useState } from "react";
import { ArrowBottom, German, Iran } from "./icon";
import person from "../assets/images/person.jpg";

const User = ({ setShowApps }) => {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  if (menu === true && setShowApps) {
    setShowApps(false);
  }

  return (
    <>
      <div dir="rtl">
        <div className="user-item" onClick={handleMenu}>
          <img src={person} />
          <p>نام و نام خانوادگی</p>
          <span>
            <ArrowBottom />
          </span>
        </div>
        {menu && (
          <>
            <div className="menu">
              <div className="user-item carrent" style={{ margin: 0 }}>
                <img src={person} />
                <span className="region">
                  <Iran />
                </span>
                <p>نام و نام خانوادگی</p>
              </div>
              <div className="user-item menu-item" style={{ margin: 0 }}>
                <img src={person} />
                <p>نام و نام خانوادگی</p>
                <span className="region">
                  <German />
                </span>
              </div>
              <a className="add" href="#">
                افزودن حساب کاربری
              </a>
              <a className="exit" href="/SelectApps">
                خروج
              </a>
            </div>
            <div className="menu-back" onClick={() => setMenu(false)}></div>
          </>
        )}
      </div>
    </>
  );
};

export default User;
