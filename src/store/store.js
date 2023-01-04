import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './userSlices/userSlice';

export default configureStore({
  reducer: {
    users: counterReducer,
  },
});

