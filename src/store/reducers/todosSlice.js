import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodos = createAsyncThunk("todos/fetchTodos", async () => {
  try {
    const res = await axios.get(
      "http://jsonplaceholder.typicode.com/todos?_limit=5"
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
export const addTodo = createAsyncThunk("todos/addTodo", async (title) => {
  try {
    const newTodo = {
      id: nanoid(),
      title: title,
      completed: false,
    };
    await axios.post("http://jsonplaceholder.typicode.com/todos", newTodo);
    return newTodo;
  } catch (error) {
    console.log(error);
  }
});
export const deleteSingle = createAsyncThunk("todos/delete", async (id) => {
  try {
    await axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`);
    return id;
  } catch (error) {
    console.log(error);
  }
});
const todosSlice = createSlice({
  name: "todos",
  initialState: {
    allTodos: [],
  },
  reducers: {
    markComplete(state, action) {
      const todoId = action.payload;
      state.allTodos = state.allTodos.map((todo) => {
        if (todo.id === todoId) todo.completed = !todo.completed;
        return todo;
      });
    },
  },
  extraReducers: {
    [getTodos.pending]: (state, action) => {
      console.log("pedinggggggg");
    },
    [getTodos.fulfilled]: (state, action) => {
      state.allTodos = action.payload;
      console.log("success");
    },
    [getTodos.rejected]: (state, action) => {
      console.log("failed");
    },
    [addTodo.fulfilled]: (state, action) => {
      state.allTodos.unshift(action.payload);
    },
    [deleteSingle.fulfilled]: (state, action) => {
      const todoId = action.payload;
      state.allTodos = state.allTodos.filter((todo) => todo.id !== todoId);
    },
  },
});
// Reducer
const todosReducer = todosSlice.reducer;

// Selector
export const todosSelector = (state) => state.todosReducer.allTodos;

// export const getTodos = () => {
//   const getTodosAsync = async (dispatch) => {
//     const res = await axios.get(
//       "http://jsonplaceholder.typicode.com/todos?_limit=5"
//     );
//     dispatch(todosFetched(res.data));
//   };
//   return getTodosAsync;
// };
// Action export
export const { markComplete } = todosSlice.actions;

// Export reducer
export default todosReducer;
