import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodoTask } from "./todoTaskReducer";

export interface ITodoGroup {
  id: number;
  title: string;
  description: string;
  todoTasksArr: ITodoTask[];
}

const initialState: ITodoGroup = {
  id: Date.now(),
  title: "",
  description: "",
  todoTasksArr: [],
};

const todoGroupSlice = createSlice({
  name: "todoGroupSlice",
  initialState,
  reducers: {
    addTasks: (state, action: PayloadAction<ITodoTask>) => {
      state.todoTasksArr.push(action.payload);
    },
    removeTasks: (state, action: PayloadAction<number>) => {
      state.todoTasksArr = state.todoTasksArr.filter(
        (el) => el.id !== action.payload
      );
    },
  },
});

export const { addTasks, removeTasks } = todoGroupSlice.actions;
export default todoGroupSlice.reducer;
