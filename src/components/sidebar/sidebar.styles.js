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
`;

export const Dividr = styled.hr`
  width: 100%;
  border: 1px dashed #3c5e7d77;
  margin-top: 15px;
  margin-bottom: 15px;
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
