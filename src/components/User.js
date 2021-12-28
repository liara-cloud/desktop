import React, { useState } from "react";
import { ArrowBottom, German, Iran } from "./icon";
import person from "../assets/images/person.jpg";
import { ipcRenderer } from "electron";

const User = ({ setShowApps }) => {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  if (menu === true && setShowApps) {
    setShowApps(false);
  }



  
  const userDate = [
    {
      id: 1,
      name: "نام و نام خانوادگی",
      region: <Iran />,
      class: "carrent",
      email: "test@test.com",
      img_src: person,
    },
    {
      id: 2,
      name: "نام و نام خانوادگی",
      region: <German />,
      class: "menu-item",
      email: "iamking.amirali@respect.com",
      img_src: person,
    },
  ];

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
              {userDate.map((item) => (
                <div
                  key={item.id}
                  className={`user-item ${item.class}`}
                  style={{ margin: 0 }}
                >
                  <img src={item.img_src} />
                  <span className="region">{item.region}</span>
                  <p>{item.name}</p>
                </div>
              ))}

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
