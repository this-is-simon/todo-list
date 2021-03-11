import "./App.css";
import { useState } from "react";
import styled from "styled-components";
import { device } from "./constants/deviceSizes";
import { v4 as uuid } from "uuid";

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

  const handleChangeInput = (event) => {
    setTask(event.target.value);
  };

  const handleSubmit = (event) => {
    if (task) {
      setTodos(todos.concat({ id: uuid(), task, completed: false }));
    }

    setTask("");
    event.preventDefault();
  };

  console.log("task?", task);

  return (
    <StyledApp className="App">
      <h1>To Do List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>{todo.task}</label>
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
