import styled from "styled-components";

export const CurrentSectionContainer = styled.div`
  background: linear-gradient(
    250.19deg,
    #0c1015 0%,
    #111d29 39.9%,
    #101c28 62.72%,
    #111111 98.42%,
    #111416 98.42%
  );
  border-bottom: 1px solid #142537;
  height: 152px;
  padding: 25px;

  div {
    position: relative;
    padding: 0px 5px;
    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }
  h4 {
    font-size: 15px;
    margin-top: 12px;
    margin-right: 5px;
    background: linear-gradient(92deg, #87fcc4 0%, #28c1f5 98.77%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    display: inline-block;
  }
  p {
    font-size: 14px;
    color: #d0e0ef;
    margin-right: 5px;
    direction: ltr;
    text-align: end;
  }
`;
