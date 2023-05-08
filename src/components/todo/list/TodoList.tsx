import { useMemo } from "react";
import { useAppSelector } from "../../../app/hooks";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const todos = useAppSelector(({ user }) => user.user.todos);
  const sortedTodos = useMemo(()=>[...todos || []]?.sort((x, y) => (x.isDone === y.isDone ? 0 : x.isDone? 1 : -1)),[todos]);
  return (
    <ul>
      {sortedTodos?.length ? sortedTodos.map((todo) => <TodoItem {...todo} />) : "no todos"}
    </ul>
  );
};

export default TodoList;
