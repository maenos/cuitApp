// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { authUser, registerAndLogin, getMe } from './action'; 

const initialState = {
  isLoggedIn: false,
  user: null,
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder.addCase(authUser.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.user = action.payload;
    });
    builder.addCase(registerAndLogin.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.token = action.payload.token;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    });
  }
});

export const {  } = authSlice.actions;
export default authSlice.reducer;
