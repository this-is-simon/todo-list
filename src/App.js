import "./App.css";
import { useReducer, useState } from "react";
import styled from "styled-components";
import { device } from "./constants/deviceSizes";
import { v4 as uuid } from "uuid";
import { filterReducer } from "./reducers/filterReducer";
import { todoReducer } from "./reducers/todoReducer";

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
  // const [todos, setTodos] = useState(initialTodos);
  const [filter, dispatchFilter] = useReducer(filterReducer, "ALL");
  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos);

  // const [state, dispatch] = useReducer(reducer, initialArg, init);
  //useReducer takes a reducer as its first argument, of type (state,action)=>{newState}
  // It takes the initial state as its second argument (or 'initialArg')
  // It returns the current state paired with a dispatch method - in this case, 'filter' and 'dispatchFilter'

  const handleChangeInput = (event) => {
    setTask(event.target.value);
  };

  const handleChangeCheckbox = (todo) => {
    dispatchTodos({
      type: todo.complete ? "UNDO_TODO" : "DO_TODO",
      id: todo.id,
    });
  };

  const handleSubmit = (event) => {
    if (task) {
      dispatchTodos({ type: "ADD_TODO", id: uuid(), task });
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
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type={"checkbox"}
                onChange={() => handleChangeCheckbox(todo)}
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
