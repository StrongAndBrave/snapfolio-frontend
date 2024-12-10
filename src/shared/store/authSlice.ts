import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthorized: typeof window !== 'undefined' ? !!localStorage.getItem('accessToken') : false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: state => {
            state.isAuthorized = true;
        },
        logout: state => {
            state.isAuthorized = false;
        },
        initializeAuth: state => {
            state.isAuthorized = typeof window !== 'undefined' ? !!localStorage.getItem('accessToken') : false;
        },
    },
});

export const { login, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
