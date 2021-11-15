import { configureStore } from "@reduxjs/toolkit";
import cellsReducer from "./cells/cellsSlice";
import russiaCubeReducer from "./russia-cube/components/slice";

export const store = configureStore({
  reducer: {
    cells: cellsReducer,
    cube: russiaCubeReducer,
  },
})
