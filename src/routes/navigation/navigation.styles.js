import styled from "styled-components";

export const NavContainer = styled.div`
  background: radial-gradient(
    87.68% 101.73% at 51.86% -0.36%,
    rgba(32, 106, 190, 0.38) 0%,
    rgba(13, 30, 51, 0) 100%
  );
  width: 100%;
  height: 100vh;
  padding: 20px 25px;
`;
export const NavFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #757f88;
  position: fixed;
  bottom: 10px;
  font-size: 14px;
  width: 100%;
  padding: 0 25px;
  left: 0;

  a {
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const NavHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
`;

export const ActionMenu = styled.button`
  cursor: pointer;
  background: none;
  border: none;
`;

export const OfflineAlert = styled.div`
  direction: rtl;
  background: #0a0d0e;
  border: 1px dashed #ffd569;
  border-radius: 8px;
  padding: 5px;
  width: 300px;
  height: 58px;
  position: absolute;
  bottom: 25px;
  color: #ffd569;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;

  p {
    padding: 5px 10px 0;
  }
`;
