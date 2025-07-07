import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodoBlock } from "../components/todoBlock";

export interface ITodoTask {
  id: number;
  title: string;
  description: string;
  todoBlocksArr: ITodoBlock[];
}

const initialState: ITodoTask = {
  id: Date.now(),
  title: "",
  description: "",
  todoBlocksArr: [],
};

const todoTaskSlice = createSlice({
  name: "todoTaskSlice",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodoBlock>) => {
      state.todoBlocksArr.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todoBlocksArr = state.todoBlocksArr.filter(
        (el: ITodoBlock) => el.id !== action.payload
      );
    },
  },
});

export const { addTodo, removeTodo } = todoTaskSlice.actions;
export default todoTaskSlice.reducer;
