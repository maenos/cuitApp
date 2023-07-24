// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth';
import postReducer from './post/posts'

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    // Ajoutez d'autres reducers ici si nécessaire
  },
});

export default store;
