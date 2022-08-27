import styled from "styled-components";

export const SidebarContainer = styled.div`
  direction: rtl;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10;
  width: 70vw;
  height: 100vh;
  padding: 20px 25px;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(11.952px);
  transition: all 0.3s;
  transform: translateX(${(props) => (props.isOpen ? `0px` : `70vw`)});
`;
