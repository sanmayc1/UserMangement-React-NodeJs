import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  username: "",
  id: "",
  role: "",
  isAuthenticated: false,
};

 const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.username = "";
      state.id = "";
      state.role = "";
      state.isAuthenticated = false;
    },
  },
});

export const { logout, login } = userSlice.actions;
export default userSlice.reducer