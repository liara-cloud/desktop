import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    .title {
        padding-right :25px;
        font-size : 14px;
        color  : #303030;
        margin-top : 30px
    }
    .caption {
        padding-right : 25px;
        margin-top : 7px;
        font-size : 12px;
        color  : #999999;
    }
    .port{
        width: 280px;
        height: 34px;
        background: #fafbfc;
        border: 1px solid #e8e8e8;
        border-radius: 7.5px;
        margin-right: 50%;
        transform: translateX(50%);
        margin-top: 24px;
        line-height: 34px;
        margin-bottom: 77px;
        direction : ltr;
        padding-right: 10px;
        font-size: 14px;
        outline: none;
        font-family : iranyekan ;
        padding-left : 10px;
        padding-top : 5px;
    }
    .btn-container{
        display:flex;
        justify-content: space-between;
        width : 100%;
        padding-right  : 25px;
        padding-left  : 25px;
        margin: 0px auto;
        mar

    }
    
`;

export default GlobalStyle;
