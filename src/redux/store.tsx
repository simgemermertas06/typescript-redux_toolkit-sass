import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../redux/todoSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    //todoReducer değişkeniyle todoSlice'ı store'a bağladık.(todo ve todoReducer ismini biz verdik)
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
