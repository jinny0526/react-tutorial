import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userEmail: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
  },
});

export const { setUserEmail } = loginSlice.actions;
export default loginSlice.reducer;
