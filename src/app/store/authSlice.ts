import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthorized: false as boolean,
        accessToken: null as null | string,
    },
    reducers: {
        setCredentials: (state, action: PayloadAction<{ accessToken: string }>) => {
            state.isAuthorized = true;
            state.accessToken = action.payload.accessToken;
        },
        logout: (state) => {
            state.isAuthorized = false;
            state.accessToken = null;
        },
    },
    selectors: {
        selectIsAuthorized: (state) => state.isAuthorized
    }
});

export const { setCredentials, logout } = authSlice.actions;
export const { selectIsAuthorized } = authSlice.selectors
export const authReducer = authSlice.reducer;
