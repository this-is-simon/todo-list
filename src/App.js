import "./App.css";
import { useReducer, useState } from "react";
import styled from "styled-components";
import { device } from "./constants/deviceSizes";
import { v4 as uuid } from "uuid";
import { filterReducer } from "./reducers/filterReducer";

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  max-width: 30%;
  margin: auto;
  @media ${device.mobile} {
    max-width: 90%;
  }
`;

const StyledButton = styled.button`
  align-self: flex-end;
  margin: 1em;
`;

const initialTodos = [
  {
    id: uuid(),
    task: "Do dishes",
    complete: false,
  },
  {
    id: uuid(),
    task: "Paint walls",
    complete: false,
  },
  {
    id: uuid(),
    task: "Fix car",
    complete: false,
  },
];

const App = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(initialTodos);
  const [filter, dispatchFilter] = useReducer(filterReducer, "ALL");

  const handleChangeInput = (event) => {
    setTask(event.target.value);
  };

  const handleChangeCheckbox = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, complete: !todo.complete };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };

  const handleSubmit = (event) => {
    if (task) {
      setTodos(todos.concat({ id: uuid(), task, complete: false }));
    }
    setTask("");
    event.preventDefault();
  };

  const handleShowAll = () => {
    dispatchFilter({ type: "SHOW_ALL" });
  };

  const handleShowComplete = () => {
    dispatchFilter({ type: "SHOW_COMPLETE" });
  };

  const handleShowIncomplete = () => {
    dispatchFilter({ type: "SHOW_INCOMPLETE" });
  };

  return (
    <StyledApp className="App">
      <h1>To Do List</h1>
      <div>
        <button type={"button"} onClick={handleShowAll}>
          Show All
        </button>
        <button type={"button"} onClick={handleShowComplete}>
          Show Complete
        </button>
        <button type={"button"} onClick={handleShowIncomplete}>
          Show Incomplete
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type={"checkbox"}
                onChange={() => handleChangeCheckbox(todo.id)}
                checked={todo.complete}
              />
              {todo.task}
            </label>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type={"text"} value={task} onChange={handleChangeInput} />
        <StyledButton type={"submit"}>Add To Do Item</StyledButton>
      </form>
    </StyledApp>
  );
};

export default App;
