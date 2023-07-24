import { createAsyncThunk } from '@reduxjs/toolkit';


import { getDataFromSecureStore } from '../../myHook/Secure';
import config from '../../config';
import axios from 'axios';


export const addPost = createAsyncThunk('post/addPost', async (postData) => {

    try {
       const token = await getDataFromSecureStore('_authToken');

        const response = await axios.post(config.API_URL+'/addPost', postData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
              },
        });
         console.log(token)
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
});

export const getPost = createAsyncThunk('post/getPost', async () => {
    try {
        const token = await getDataFromSecureStore('_authToken');

        const response = await axios.get(config.API_URL + '/getPost', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
});




export const deletePost = createAsyncThunk('post/deletePost', async (postId) => {
    try {
        const token = await getDataFromSecureStore('_authToken');

        await axios.delete(config.API_URL + `/deletePost/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return postId;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
});
