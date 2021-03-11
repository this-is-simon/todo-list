import "./App.css";
import { useState } from "react";
import styled from "styled-components";
import { device } from "./constants/deviceSizes";

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
    id: "a",
    task: "Do dishes",
    complete: false,
  },
  {
    id: "b",
    task: "Paint walls",
    complete: false,
  },
  {
    id: "c",
    task: "Fix car",
    complete: false,
  },
];

const App = () => {
  const [task, updateTask] = useState();

  const handleChangeInput = (event) => {
    updateTask(event.target.value);
  };

  console.log("task?", task);

  return (
    <StyledApp className="App">
      <h1>To Do List</h1>
      <input onChange={handleChangeInput} />
      <StyledButton type={"submit"}>Add To Do Item</StyledButton>
      <ul>
        {initialTodos.map((todo) => (
          <li key={todo.id}>
            <label>{todo.task}</label>
          </li>
        ))}
      </ul>
    </StyledApp>
  );
};

export default App;
