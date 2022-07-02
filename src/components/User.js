import React, { useContext, useEffect, useState } from "react";
import { ArrowBottom, German, Iran } from "./icon";
import { Context } from "./contextApi/Context";
import { withRouter } from "react-router";

const User = (props) => {
  const [menu, setMenu] = useState(false);
  const context = useContext(Context);
  const {
    accounts,
    handleChangeCurrent,
    current,
    setShowApps,
    openConsoleLogin,
    handleLogout,
    isDeploy,
    showApps,
    checkIsDirectory,
    file,
  } = context;

  useEffect(() => {
    if (accounts.length == 0) {
      props.history.push("/");
    }
  }, [accounts]);

  const handleMenu = () => {
    setMenu(!menu);
  };

  if (menu === true && showApps === true) {
    setShowApps(false);
  }

  const handleClick =  (item) => {
    (item.email !== current.email || item.region !== current.region) &&
      handleChangeCurrent(item.email, item.region);
    checkIsDirectory(file);
    setMenu(!menu);
  };

  return (
    <>
      <div dir="rtl" style={isDeploy ? { opacity: "0.7" } : {}}>
        <div
          className="center-current-item "
          onClick={!isDeploy ? handleMenu : null}
        >
          {current !== undefined && (
            <>
              <img src={`http://${current.avatar}`} draggable="false" />
              {current.region == "germany" && (
                <span className="region">
                  <German />
                </span>
              )}
              <p>{current.fullname}</p>
            </>
          )}
          <span>
            <ArrowBottom />
          </span>
        </div>
        {menu && isDeploy === false && (
          <>
            <div className="menu">
              {Object.values(accounts).map((item, index) => (
                <div
                  onClick={() => handleClick(item)}
                  key={index}
                  className={`user-item  ${
                    item.current ? `current` : `menu-item`
                  }
                     `}
                  style={{ margin: 0 }}
                >
                  <img src={`http://${item.avatar}`} draggable="false" />

                  <span className="region">
                    {item.region == "iran" ? <Iran /> : <German />}
                  </span>

                  <p style={{ whiteSpace: "nowrap" }}>
                    {item.fullname.length >= 15
                      ? item.fullname.slice(0, 15) + "..."
                      : item.fullname}
                  </p>
                </div>
              ))}

              <span onClick={() => openConsoleLogin()} className="add" href="#">
                افزودن حساب کاربری
              </span>
              <a
                onClick={() => handleLogout(current.email, current.region)}
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
