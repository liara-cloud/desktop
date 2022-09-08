import styled from "styled-components";

export const ActionFlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.justifyContent};
`;
