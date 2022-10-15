import React, { Fragment, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { ipcRenderer } from "electron";
import Sidebar from "../../components/sidebar/sidebar.component";
import { toggle } from "../../store/sidebarSlice";
import {
  ActionContainer,
  ActionMenu,
  ActionNav,
  NavContainer,
  NavFooter,
  NavHeader,
  Alert,
  OfflineContainer,
  WindowsContainer
} from "./navigation.styles";

import OfflineIcon from "./offline-icon.component";

import getLastVersion from "../../utility/last-version.utlis";

import openMenuIcon from "../../assets/images/menu-open.svg";
import closeMenuIcon from "../../assets/images/menu-close.svg";
import liaraLogo from "../../assets/images/logo.svg";
import closeIcon from "../../assets/images/close.svg";
import minimizeIcon from "../../assets/images/minimize.svg";
import info from "../../assets/images/info.svg";

import { BlurContainer } from "../../components/blur-container/blur-container.styles";

const deployState =['preparation-build', 'upload-progress', 'build']
const deployStatus =['pending', 'start', 'finish']

const links = {
  darwin_arm64: "http://desktop.liara.ir/releases/Liara-Desktop-latest-mac-arm64.dmg.zip",
  darwin_x64: "http://desktop.liara.ir/releases/Liara-Desktop-latest-mac-x64.dmg.zip",
  linux_arm64: "http://desktop.liara.ir/releases/Liara-Desktop-latest-linux-arm64.deb.zip",
  linux_amd64: "http://desktop.liara.ir/releases/Liara-Desktop-latest-linux-amd64.deb.zip",
  other: "https://docs.liara.ir/desktop/install",
}

const Navigation = () => {
  const [version, setVersion] = useState(null);
  const [online, setOnline] = useState(true);
  const [platformInfo, setPlatformInfo] = useState({platform: "", arch: ""});
  const [downlaodLink, setDownlaodLink] = useState("");
  const [showUpdateAppModal, setShowUpdateAppModal] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const { isOpen } = useSelector(state => state.sidebar);
  const { state , status} = useSelector(state => state.deploy);
  
  const checkDeployProcess = deployState.includes(state) && deployStatus.includes(status)

  const isAuthPage = location?.pathname === "/auth";

  const minimize = useRef();
  const close = useRef();

  const handleToggleSidebar = () => {
    dispatch(toggle());
  };

  const openTicketingInBrowser = () => {
    ipcRenderer.send("console", {
      support: true
    });
  };

  useEffect(() => {
    ipcRenderer.send("app_version", "liara-cloud");

    window.addEventListener("offline", () => {
      setOnline(false);
    });
    window.addEventListener("online", () => {
      setOnline(true);
    });

    window.onerror = (error) => {
      ipcRenderer.send("errorInWindow", error)
    }

    if (minimize.current && close.current) {
      minimize.current.addEventListener("click", function(e) {
        ipcRenderer.invoke("frame", "minimize");
      });
      close.current.addEventListener("click", function(e) {
        ipcRenderer.invoke("frame", "close");
      });
    }
  }, []);

  useEffect(() => {
      ipcRenderer.on("app_version", async (_, arg) => {
        setVersion(arg.version);
        const lastVersion = await getLastVersion()
        if(!isWin && (arg.version !== lastVersion)) {
          setShowUpdateAppModal(true);
          
          ipcRenderer.invoke('platform').then(({ arch, platform }) =>{
            setPlatformInfo({ arch, platform })
            const link = links[`${platform}_${arch}`] || links.other
            setDownlaodLink(link)
          })
        }
      });
  }, [])


  const isWin = platformInfo.platform === "Win32" || platformInfo.platform  === "Win64";

  const handleOpenLink = () => {
    ipcRenderer.invoke("openUrl", { page: downlaodLink });
  }


  return (
    <WindowsContainer>
      {isWin &&
        <ActionContainer>
          {/* <img src={logo} width={"20"} /> */}
          <p>Liara Desktop</p>

          <ActionNav>
            <div ref={minimize}>
              <img src={minimizeIcon} width={"19"} />
            </div>
            <div ref={close}>
              <img src={closeIcon} width={"19"} />
            </div>
          </ActionNav>
        </ActionContainer>}
      <NavContainer>
        {!online &&
          <BlurContainer height={!isWin ? "100vh" : "94vh"}>
            <Alert>
              <OfflineIcon />
              <p>لطفا دسترسی به اینترنت خود را بررسی کنید.</p>
            </Alert>
          </BlurContainer>}
        {showUpdateAppModal &&
          <BlurContainer height={!isWin ? "100vh" : "94vh"}>
            <button className="close">فعلا نه :(</button>
            <Alert style={{color: "#26C2EE" , borderColor: "#26C2EE"}}>
              <img src={info} width={20} style={{marginTop: 4}} />
              <p>به‌روزرسانی جدید در دسترس است.</p>
              <button onClick={handleOpenLink}>دریافت</button>
            </Alert>
          </BlurContainer>}

        {!isAuthPage &&
          <Fragment>
            <NavHeader>
              <ActionMenu disabled={checkDeployProcess} onClick={handleToggleSidebar}>
                <img src={isOpen ? closeMenuIcon : openMenuIcon} />
              </ActionMenu>
              <img src={liaraLogo} width="70" />
            </NavHeader>
            <Sidebar />
          </Fragment>}
        <Outlet />
        <NavFooter>
          <p>
            نسخه {version}
          </p>
          <a onClick={openTicketingInBrowser}>ارتباط با پشتیبانی</a>
        </NavFooter>
      </NavContainer>
    </WindowsContainer>
  );
};

export default Navigation;
