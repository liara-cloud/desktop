import React, { useContext, useEffect, useState } from "react";
import { ArrowBottom, German, Iran } from "./icon";
import { Context } from "./contextApi/Context";
import { withRouter } from "react-router";

const User = (props, { setShowApps }) => {
  const [menu, setMenu] = useState(false);
  const context = useContext(Context);
  const {
    accounts,
    handleChangeCurrent,
    current,
    openConsoleLogin,
    handleExit,
  } = context;

  useEffect(() => {
    if (Object.values(accounts).length === 0) {
      props.history.push("/");
    }
  }, [accounts]);
  const handleMenu = () => {
    setMenu(!menu);
  };
  if (menu === true && setShowApps) {
    setShowApps(false);
  }

  const changeCurrent = () => {}


  return (
    <>
      <div dir="rtl">
        <div className="user-item" onClick={handleMenu}>
          {current !== undefined && (
            <>
              <img src={current.avatar} />
              <p>{current.fullname}</p>
            </>
          )}
          <span>
            <ArrowBottom />
          </span>
        </div>
        {menu && (
          <>
            <div className="menu">
              {Object.values(accounts).map((item, index) => (
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

              <span onClick={() => openConsoleLogin()} className="add" href="#">
                افزودن حساب کاربری
              </span>
              <a
                onClick={() => handleExit(current.email, current.region)}
                className="exit"
              >
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

export default withRouter(User);
