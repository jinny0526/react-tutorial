import { createSlice } from "@reduxjs/toolkit";
//초기값 만들기
const initialState = {
  currentUser: { userid: null, email: null },
  isLogin: false,
};
//로그인 정보 넣기
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    addCurrentUser(state, action) {
      state.currentUser = action.payload.currentUser;
      state.isLogin = action.payload.isLogin;
    },
  },
});
//밖으로 사용할 수 잇도록 내보내기
export const { addCurrentUser } = loginSlice.actions;
export default loginSlice.reducer;
