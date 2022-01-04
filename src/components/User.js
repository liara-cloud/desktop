import React, { useContext, useEffect, useState } from "react";
import { ArrowBottom, German, Iran } from "./icon";
import person from "../assets/images/person.jpg";
import { Context } from "./contextApi/Context";
import { ipcRenderer } from "electron";

const User = ({ setShowApps }) => {
  const [menu, setMenu] = useState(false);
  const context = useContext(Context);
  const { account, accounts } = context.cliUser;
  const { handleChangeCurrent , current } = context;
  const handleMenu = () => {
    setMenu(!menu);
  };
  if (menu === true && setShowApps) {
    setShowApps(false);
  }
  const currentUser = Object.values(accounts).filter((item) => item.current)[
    "0"
  ];
  console.log(currentUser);
  return (
    <>
      <div dir="rtl">
        <div className="user-item" onClick={handleMenu}>
          <img src={currentUser.avatar} />
          <p>{currentUser.fullname}</p>
          <span>
            <ArrowBottom />
          </span>
        </div>
        {menu && (
          <>
            <div className="menu">
              {Object.entries(account).length != 0 && (
                <div className={`user-item current`} style={{ margin: 0 }}>
                  <img src={account.avatar} />
                  <span className="region">
                    {account.region == "iran" ? <Iran /> : <German />}
                  </span>
                  <p>{account.fullname}</p>
                </div>
              )}
              {accounts.length != [] &&
                Object.values(accounts).map((item, index) => (
                  <div
                    onClick={() => {
                      handleChangeCurrent(item.email, item.region);
                    }}
                    key={index}
                    className={`user-item  ${
                      item.current ? `current` : `menu-item`
                    }
                     `}
                    style={{ margin: 0 }}
                  >
                    <img src={item.avatar} />
                    <span className="region">
                      {item.region == "iran" ? <Iran /> : <German />}
                    </span>
                    <p>{item.fullname}</p>
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
