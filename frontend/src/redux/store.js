import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./features/userSlice.js"
import { eventApi } from './api/eventApi.js';
import { authApi } from './api/authApi.js';
import { userApi } from './api/userApi.js';

export const store = configureStore({
    reducer: {
      auth: userReducer,
        [eventApi.reducerPath]: eventApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
      },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat([eventApi.middleware, authApi.middleware, userApi.middleware]),
});