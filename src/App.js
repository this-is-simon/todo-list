import "./App.css";
import { useReducer, useState } from "react";
import styled from "styled-components";
import { device } from "./constants/deviceSizes";
import { v4 as uuid } from "uuid";
import { filterReducer } from "./reducers/filterReducer";
import { todoReducer } from "./reducers/todoReducer";
import { Filter } from "./components/Filter";
import { ToDoList } from "./components/ToDoList";
import { AddToDo } from "./components/AddToDo";

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
  const [filter, dispatchFilter] = useReducer(filterReducer, "ALL");
  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos);

  // const [state, dispatch] = useReducer(reducer, initialArg, init);
  //useReducer takes a reducer as its first argument, of type (state,action)=>{newState}
  // It takes the initial state as its second argument (or 'initialArg')
  // It returns the current state paired with a dispatch method - in this case, 'filter' and 'dispatchFilter'

  const filteredTodos = todos.filter((todo) => {
    if (filter === "ALL") {
      return true;
    }
    if (filter === "COMPLETE" && todo.complete) {
      return true;
    }
    if (filter === "INCOMPLETE" && !todo.complete) {
      return true;
    }
    return false;
  });

  return (
    <StyledApp className="App">
      <h1>To Do List</h1>
      <Filter dispatch={dispatchFilter} />
      <ToDoList dispatch={dispatchTodos} todos={filteredTodos} />
      <AddToDo dispatch={dispatchTodos} />
    </StyledApp>
  );
};

export default App;
