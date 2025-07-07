import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodoGroup } from "./todoGroupReducer";

interface ITodoApp {
  todoGroupsArr: ITodoGroup[];
}

const initialState: ITodoApp = {
  todoGroupsArr: [],
};

const todoAppSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<ITodoGroup>) => {
      state.todoGroupsArr.push(action.payload);
    },
    removeGroupe: (state, action: PayloadAction<number>) => {
      state.todoGroupsArr = state.todoGroupsArr.filter(
        (el) => el.id !== action.payload
      );
    },
  },
});

export default todoAppSlice.reducer;
export const { addGroup, removeGroupe } = todoAppSlice.actions;
