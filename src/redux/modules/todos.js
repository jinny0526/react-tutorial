import { nanoid } from "nanoid";

const initialState = [
  {
    id: nanoid(),
    title: "제목1",
    content: "내용1",
    author:
      "작성자입니다. 추후에 firebase와 연결 후 이메일을 여기에 작성하겠습니다.",
  },
  {
    id: nanoid(),
    title: "제목2",
    content: "내용2",
    author:
      "작성자입니다. 추후에 firebase와 연결 후 이메일을 여기에 작성하겠습니다.",
  },
  {
    id: nanoid(),
    title: "제목3",
    content: "내용3",
    author:
      "작성자입니다. 추후에 firebase와 연결 후 이메일을 여기에 작성하겠습니다.",
  },
];

const todos = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    //데이터 삭제하는 기능 가져오기
    case "NEW_TODO":
      return [...state, action.payload];

    //데이터를 추가하는 기능 action에서 데이터 추가라는 특정한 값을 가져와야하기때문에 payload값을 가져와서 state에 있는 값을 통채로 가져온 후 새로 값을 가져오면 그값에 맞춰서 변경시킴 익숙한게 todo라 그냥.. 썼습니다
    case "EDIT_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, ...action.payload.changes }
          : todos
      );
    // 일단 todo 각 아이디가 일치하는지를 확인하고 기존의 배열과 변경된 객체 그리고 수정된 부분을 찾아서 바꿀 수 가 있습니다.
    default:
      return state;
  }
};

export default todos;
