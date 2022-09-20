import styled from "styled-components";

export const AppListContainer = styled.div`
  display: none;
  max-height: 78px;
  transition: all 0.15s;
  width: 100%;
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
