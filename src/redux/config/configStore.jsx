// 중앙 데이터 관리소(store)를 설정하는 부분
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import todos from "../modules/todosSlice";

//configurestore에서 {}를 넣고 그 안에 reducer를 넣고 변수를 만들어 넣기!!
const store = configureStore({
  reducer: {
    todos: todos.reducer,
  },
});

export default store;