import styled from "styled-components";

export const TodoItemText = styled.span<{ isDone: boolean }>`
  padding: 5px;
  background: #d1eaf0;

  ${props=> props.isDone && 'text-decoration: line-through'}
`;
