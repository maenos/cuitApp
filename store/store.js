// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth';


const store = configureStore({
  reducer: {
    auth: authReducer,
    // Ajoutez d'autres reducers ici si nécessaire
  },
});

export default store;
