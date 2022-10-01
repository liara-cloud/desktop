import styled from "styled-components";

export const AppPlatformContainer = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 25px;
    height: 25px;
    border-radius: 6px;
    border: 1px solid transparent;
    border-image-source: linear-gradient(
      247.19deg,
      #87fcc4 1.49%,
      rgba(89, 203, 213, 0) 26.9%,
      rgba(100, 184, 224, 0) 75.57%,
      #87fcc4 98.94%
    );
  }
  p {
    font-size: 14px;
    margin-right: 6px;
    font-weight: 600;
    color: #d0e0ef;
  }
`;
