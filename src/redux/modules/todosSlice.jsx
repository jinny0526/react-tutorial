import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = [
  {
    id: nanoid(),
    title: "알고리즘 어려워..",
    content: "안해",
    author: "바보1",
  },
  {
    id: nanoid(),
    title: "타입스트립트 풀기싫어",
    content: "근데 뭔소린지 모르겠어....",
    author: "바보2.",
  },
  {
    id: nanoid(),
    title: "투두리스트 바꿔보기",
    content: "기본기능도 해설강의 또 본다...",
    author: "바보3",
  },
];

const todos = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    //이부분 다시 찾아보기 여기가 잘못
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    //대문자로 거의 안쓴다. 대문자는 상수값을 저장하고 싶을때 쓴다. 문자열을 고정하고 싶을때 대문자를 변수로 선언
    //함수를 쓸때는 소문자로 쓰고 뒷글자 첫글자만 대문자로 쓴다. 대문자는 문자열로 저장되어 있을꺼라고 생각하니까 항상 같은 값
    //상수를 저정할때 대문자로 저장한다 기억하기!!! addTodo로 바꿔쓰기!
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },

    editTodo: (state, action) => {
      return state.map(
        (todo) =>
          todo.id === action.payload.id
            ? { ...todo, ...action.payload.changes }
            : todo
        // post.id === state?.post.id? { ...post, ...inputs, } : post); 이부분 참고했습니다
        // todo를 가져오기 changes는 바뀌는 부분 다 넣어서 해결하기
        //기존갑하고 비교해서 수정하기
        //
      );
    },
  },
});

export const { addTodo, deleteTodo, editTodo } = todos.actions;
export default todos;
