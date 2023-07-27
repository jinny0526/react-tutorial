import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = [
  {
    id: nanoid(),
    title: "제목1",
    content: "내용1",
    author: "바보1",
  },
  {
    id: nanoid(),
    title: "제목2",
    content: "내용2",
    author: "바보2.",
  },
  {
    id: nanoid(),
    title: "제목3",
    content: "내용3",
    author: "바보3",
  },
];

const todos = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    //이부분 다시 찾아보기 여기가 잘못
    ADD_TODO: (state, action) => {
      state.push(action.payload);
    },
    DELETE_TODO: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },

    EDIT_TODO: (state, action) => {
      return state.map(
        (todo) =>
          todo.id === action.payload.id
            ? { ...todo, ...action.payload.changes }
            : todo
        // post.id === state?.post.id? { ...post, ...inputs, } : post); 이부분 참고했습니다
        // todo를 가져오기 changes는 바뀌는 부분 다 넣어서 해결하기
        //기존갑하고 비교해서 수정하기
      );
    },
  },
});

export const { ADD_TODO, DELETE_TODO, EDIT_TODO } = todos.actions;
export default todos;
