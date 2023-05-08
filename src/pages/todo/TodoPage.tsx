import Form from "../../components/todo/form/TodoForm";
import TodoList from "../../components/todo/list/TodoList";

const TodoPage = () => {
  return (
    <div>
      <h2>Todo</h2>
      <Form />
      <TodoList />
    </div>
  );
};

export default TodoPage;
