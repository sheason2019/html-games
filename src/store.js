import { configureStore } from "@reduxjs/toolkit";
import cellsReducer from "./cells/cellsSlice";

export const store = configureStore({
  reducer: {
    cells: cellsReducer,
  },
})
