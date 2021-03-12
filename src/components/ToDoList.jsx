export const ToDoList = ({ dispatch, todos }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <ToDoItem key={todo.id} dispatch={dispatch} todo={todo} />
      ))}
    </ul>
  );
};

const ToDoItem = ({ dispatch, todo }) => {
  const handleChange = () => {
    dispatch({
      type: todo.complete ? "UNDO_TODO" : "DO_TODO",
      id: todo.id,
    });
  };

  return (
    <li key={todo.id}>
      <label>
        <input
          type={"checkbox"}
          onChange={handleChange}
          checked={todo.complete}
        />
        {todo.task}
      </label>
    </li>
  );
};
