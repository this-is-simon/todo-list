import { v4 as uuid } from "uuid";
import styled from "styled-components";
import { useState } from "react";

const StyledButton = styled.button`
  align-self: flex-end;
  margin: 1em;
`;

export const AddToDo = ({ dispatch }) => {
  const [task, setTask] = useState("");
  const handleChangeInput = (event) => {
    setTask(event.target.value);
  };

  const handleSubmit = (event) => {
    if (task) {
      dispatch({ type: "ADD_TODO", id: uuid(), task });
    }
    setTask("");
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type={"text"} value={task} onChange={handleChangeInput} />
      <StyledButton type={"submit"}>Add To Do Item</StyledButton>
    </form>
  );
};
