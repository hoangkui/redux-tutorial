import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteSingle,
  markComplete,
  todosSelector,
  getTodos,
} from "../store/reducers/todosSlice";
import TodoForm from "./TodoForm";

const Todos = () => {
  const todos = useSelector(todosSelector);
  const dispatch = useDispatch();
  const toggleTodoCompleted = (id) => {
    dispatch(markComplete(id));
  };
  const deleteSingleTodo = (id) => {
    dispatch(deleteSingle(id));
  };

  useEffect(() => {
    dispatch(getTodos(null));
  }, []);
  return (
    <div className="todo-list">
      <TodoForm />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            {todo.title}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodoCompleted(todo.id)}
            />
            <button onClick={() => deleteSingleTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
