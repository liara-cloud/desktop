import styled from "styled-components";

export const AppConfigContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 18px;
  margin-bottom: 90px;
`;
export const SelectAppContainer = styled.div`
  width: 300px;
  font-size: 12px;
  line-height: 19px;
  color: #d0e0ef;
  background: linear-gradient(
    180deg,
    #162232 0%,
    #17222e99 49.48%,
    #172433 100%
  );
  border: 1px solid
    ${props => (props.isActive ? "#70EED1" : "rgba(161, 201, 238, 0.1)")};

  border-radius: 8px;
  cursor: pointer;
  z-index: 3;
  ${props => props.absolute && `position: absolute`};
  top: -2px;
`;

export const AppItem = styled.span`
  display: flex;
  align-items: center;
  margin-top: -2px;
  padding-bottom: 5px;
  justify-content: space-between;
`;

export const CloseContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
`;
