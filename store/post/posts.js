// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getPost, addPost, deletePost } from './action';

const initialState = {

    posts: null,


};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(getPost.fulfilled, (state, action) => {
            state.posts = action.payload;
        });
     
        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.posts = state.posts.filter(post => post.id !== action.payload.id);
        });


    }
});

export const { } = postSlice.actions;
export default postSlice.reducer;
