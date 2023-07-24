// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { authUser, registerAndLogin, getMe } from './action'; 
import { getDataFromSecureStore } from '../../myHook/Secure';

const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
  
};

export const initializeAuth = () => async (dispatch) => {
  try {
    const token = await getDataFromSecureStore('_authToken');
    if (token) {
      
      dispatch(getMe(token));

    }
  } catch (error) {
    console.log('Error initializing auth:', error);
  }
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(authUser.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.token = action.payload.token;

      
    });
    builder.addCase(registerAndLogin.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.token = action.payload.token;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user.user;
      state.token = action.payload.token;
    });
    builder.addCase(getMe.rejected, (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    });
  }
});

export const {  } = authSlice.actions;
export default authSlice.reducer;
