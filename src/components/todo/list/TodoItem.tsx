import { memo } from "react";
import { useAppDispatch } from "../../../app/hooks";
import {
  ITodo,
  checkTodoAsync,
  deleteTodoAsync,
} from "../../../store/slices/userSlice";
import CustomButton from "../../ui/button/CustomButton";
import { TodoItemText } from "./styles";

const TodoItem = memo((todo: ITodo) => {
  const dispatch = useAppDispatch();
  return (
    <li key={todo._id}>
      <TodoItemText isDone={todo.isDone}>{todo.label}</TodoItemText>

      <CustomButton
        onClick={() => dispatch(checkTodoAsync(todo._id))}
        disabled={todo.isDone}
      >
        Done
      </CustomButton>
      <CustomButton onClick={() => dispatch(deleteTodoAsync(todo._id))}>
        Delete
      </CustomButton>
    </li>
  );
});

export default TodoItem;
