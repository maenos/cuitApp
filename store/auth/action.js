// actions.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config';

// Action asynchrone avec createAsyncThunk
export const authUser = createAsyncThunk('auth/authUser', async (data) => {
  try {
    const response = await axios.post(config.API_URL+ '/auth2', data);
    return response.data;
  } catch (error) {
    console.log(error)

    throw new Error(error.message);
  }
});


export const registerAndLogin = createAsyncThunk('auth/registerAndLogin', async (data) => {
  try {
    const response = await axios.post(config.API_URL+ '/auth1', data);
    return response.data;
    
  } catch (error) {
    console.log(error)

    throw new Error(error.message);
  }
});

export const getMe = createAsyncThunk('auth/getMe', async (token) => {
  try {
    const response = await axios.get(config.API_URL+ '/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error)
    throw new Error(error.message);
  }
});

