import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { App } from "./components/app";
import todoAppSlice from "./reducers/todoAppReducer";
import todoGroupSlice from "./reducers/todoGroupReducer";
import todoTaskSlice from "./reducers/todoTaskReducer";
import { TodoGroup } from "./components/todoGroup";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = configureStore({
  reducer: {
    todoAppSlice: todoAppSlice,
    todoGroupSlice: todoGroupSlice,
    todoTaskSlice: todoTaskSlice,
  },
});

export type rootState = ReturnType<typeof store.getState>;

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
