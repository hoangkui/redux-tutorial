import React, { useState } from "react";
import { addTodo } from "../store/reducers/todosSlice";
import { useDispatch } from "react-redux";
const TodoForm = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const addSingleTodo = (e) => {
    e.preventDefault();
    dispatch(addTodo(title));
    setTitle("");
  };
  return (
    <div>
      <form onSubmit={addSingleTodo}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};

export default TodoForm;
