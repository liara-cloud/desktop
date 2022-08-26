// background: radial-gradient(99.29% 113.09% at 0.71% 50.52%, rgba(32, 106, 190, 0.38) 0%, rgba(13, 30, 51, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
// transform: rotate(90deg);

import styled from 'styled-components';

export const NavContainer = styled.div`
  background: radial-gradient(
    87.68% 101.73% at 51.86% -0.36%,
    rgba(32, 106, 190, 0.38) 0%,
    rgba(13, 30, 51, 0) 100%
  );
  width: 100%;
  height: 100vh;
  padding: 25px;
`;
export const NavFooter = styled.div`
  color: #757f88;
  position: fixed;
  bottom: 10px;
  font-size: 14px;
`;
