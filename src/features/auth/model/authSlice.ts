import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthorized: false as boolean,
    },
    reducers: {
        login: state => {
            state.isAuthorized = true;
        },
        logout: state => {
            state.isAuthorized = false;
        },
    },
    selectors: {
        selectIsAuthorized: state => state.isAuthorized,
    },
});

export const { login, logout } = authSlice.actions;
export const { selectIsAuthorized } = authSlice.selectors;
export const authReducer = authSlice.reducer;
