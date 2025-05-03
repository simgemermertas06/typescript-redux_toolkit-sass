import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TodoInitialState, TodoType } from "../types/Types";

const initialState: TodoInitialState = {
  //initialState'in tipi TodoIntialSatate tipindedir
  //Her yerden erişilebilmesi için Types.tsx içinde tanımladık
  todos: [], // TodoInitialState içindeki ilk değerimi boş bir Array olarak başlatıyoruz
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // Todo Oluşturma
    createTodo: (state: TodoInitialState, action: PayloadAction<TodoType>) => {
      state.todos = [...state.todos, action.payload];
    },
    //Todo Silme
    removeTodoById: (
      state: TodoInitialState,
      action: PayloadAction<number>
    ) => {
      state.todos = [
        ...state.todos.filter((todo: TodoType) => todo.id !== action.payload),
      ];
    },
    //Todo Güncelleme
    updateTodo: (state: TodoInitialState, action: PayloadAction<TodoType>) => {
      state.todos = [
        ...state.todos.map((todo: TodoType) =>
          todo.id !== action.payload.id ? todo : action.payload
        ),
      ];
    },
  },
});

export const { createTodo, removeTodoById, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
