import styled from "styled-components";

export const ButtonStyles = styled.button`
  padding: 5px 10px;
  margin: 5px;
  background: #87ceeb;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:disabled {
    background: gray;
  }
`;
