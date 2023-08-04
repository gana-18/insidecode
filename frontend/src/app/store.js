import { configureStore,getDefaultMiddleware} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import postReducer from '../features/post/postSlice';
import thunk from 'redux-thunk';

const middleware = [...getDefaultMiddleware(), thunk];

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  },
  middleware,
});
