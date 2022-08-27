import { createGlobalStyle } from "styled-components";

// fonts
import YekanBakhThinWoff from "./assets/fonts/woff/YekanBakh-Thin.woff";
import YekanBakhLightWoff from "./assets/fonts/woff/YekanBakh-Light.woff";
import YekanBakhRegulrWoff from "./assets/fonts/woff/YekanBakh-Regular.woff";
import YekanBakhSemiBoldWoff from "./assets/fonts/woff/YekanBakh-SemiBold.woff";
import YekanBakhBolddWoff from "./assets/fonts/woff/YekanBakh-Bold.woff";
import YekanBakhExtraBolddWoff from "./assets/fonts/woff/YekanBakh-ExtraBold.woff";
import YekanBakhBlackdWoff from "./assets/fonts/woff/YekanBakh-Black.woff";

import YekanBakhThinWoff2 from "./assets/fonts/woff2/YekanBakh-Thin.woff2";
import YekanBakhLightWoff2 from "./assets/fonts/woff2/YekanBakh-Light.woff2";
import YekanBakhRegulrWoff2 from "./assets/fonts/woff2/YekanBakh-Regular.woff2";
import YekanBakhSemiBoldWoff2 from "./assets/fonts/woff2/YekanBakh-SemiBold.woff2";
import YekanBakhBolddWoff2 from "./assets/fonts/woff2/YekanBakh-Bold.woff2";
import YekanBakhExtraBolddWoff2 from "./assets/fonts/woff2/YekanBakh-ExtraBold.woff2";
import YekanBakhBlackdWoff2 from "./assets/fonts/woff2/YekanBakh-Black.woff2";

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: Yekan Bakh;
    font-style: normal;
    font-weight: 100;
    src: url(${YekanBakhThinWoff}) format("woff"),
      url(${YekanBakhThinWoff2}) format("woff2");
  }
  
  @font-face {
    font-family: Yekan Bakh;
    font-style: normal;
    font-weight: 300;
    src: url(${YekanBakhLightWoff}) format("woff"),
      url(${YekanBakhLightWoff2}) format("woff2");
  }
  
  @font-face {
    font-family: Yekan Bakh;
    font-style: normal;
    font-weight: normal;
    src: url(${YekanBakhRegulrWoff}) format("woff"),
      url(${YekanBakhRegulrWoff2}) format("woff2");
  }
  
  @font-face {
    font-family: Yekan Bakh;
    font-style: normal;
    font-weight: 600;
    src: url(${YekanBakhSemiBoldWoff}) format("woff"),
      url(${YekanBakhSemiBoldWoff2}) format("woff2");
  }
  
  @font-face {
    font-family: Yekan Bakh;
    font-style: normal;
    font-weight: bold;
    src: url(${YekanBakhBolddWoff}) format("woff"),
      url(${YekanBakhBolddWoff2}) format("woff2");
  }
  
  @font-face {
    font-family: Yekan Bakh;
    font-style: normal;
    font-weight: 800;
    src: url(${YekanBakhExtraBolddWoff}) format("woff"),
      url(${YekanBakhExtraBolddWoff2}) format("woff2");
  }
  
  @font-face {
    font-family: Yekan Bakh;
    font-style: normal;
    font-weight: 900;
    src: url(${YekanBakhBlackdWoff}) format("woff"),
      url(${YekanBakhBlackdWoff2}) format("woff2");
  }
  
  body {
    font-family: Yekan Bakh;
    background: #111;
    color: #fff;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  a {
    text-decoration: none;
  } 
`;

export default GlobalStyle;
