import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { baseApi } from '../api/api';
import authReducer, { initializeAuth } from './authSlice';

const config = {
    apiBaseUrl: 'https://inctagram.work/api/v1/',
    timeout: 5000,
};

export const extraArgument = {
    config,
};

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: authReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: { extraArgument } }).concat(baseApi.middleware),
});

store.dispatch(initializeAuth());

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
