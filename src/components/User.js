import React, { useContext, useEffect, useState } from "react";
import { ArrowBottom, German, Iran } from "./icon";
import person from "../assets/images/person.jpg";
import { Context } from "./contaxtApi/Contaxt";

const User = ({ setShowApps }) => {
  const [menu, setMenu] = useState(false);
  const context = useContext(Context);
  const { account, accounts, current } = context.cliUSer;
  console.log({ account, accounts, current });
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
                accounts.map((item) => (
                  <div
                    key={item.email}
                    className={`user-item menu-item`}
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
