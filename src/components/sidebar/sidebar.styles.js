import styled from "styled-components";

export const SidebarContainer = styled.div`
  direction: rtl;
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 10;
  width: 70vw;
  height: ${props => (props.isWin ? "94vh" : "100vh")};
  background: rgba(0, 0, 0, 0.60);
  backdrop-filter: blur(11.952px);
  transition: all 0.3s;
`;

export const OptionItem = styled.button`
  color: #d0e0ef;
  font-size: 14px;
  padding: 8px 0;
  cursor: pointer;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

export const CloseContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: ${props => props.height};
  top: 0;
  left: 0;
`;
