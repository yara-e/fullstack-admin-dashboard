import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./auth.types";
import { saveToken, removeToken } from "@/utils/token";


interface AuthState {
    user: User | null;
    token: string | null;
}

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem("access_token"),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (
            state,
            action: PayloadAction<{ user: User; token: string }>
        ) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            saveToken(action.payload.token)
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
             
            removeToken()
        },
    },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
