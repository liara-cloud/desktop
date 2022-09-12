import styled from "styled-components";

export const AppListContainer = styled.div`
  display: none;
  position: absolute;
  top: 43px;
  width: 300px;
  height: 78px;
  background: linear-gradient(
    180deg,
    rgba(98, 161, 254, 0.0231) 0%,
    rgba(37, 38, 45, 0.2046) 100%
  );
  border: 1px solid rgba(161, 201, 238, 0.1);
  border-radius: 8px;
  transition: all 0.15s;
  overflow-y: scroll;
`;

export const ProjectItem = styled.div`
  height: 30px;
  padding: 3px;
  margin: 5px;
  border-radius: 6px;
  background: linear-gradient(92deg, #87fcc415 0%, #28c1f515 98.77%);
  border-radius: 6px;
  cursor: pointer;
  p {
    &:hover {
      background: linear-gradient(92deg, #87fcc4 0%, #28c1f5 98.77%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }
`;
