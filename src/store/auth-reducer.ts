
import { AppThunk } from "./store";
import { authAPI, LoginParamsType } from "../api/auth-api";
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {appActions} from './app-reducer';

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn;
        },
    },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;

//thunks
export const loginTC =
    (params: LoginParamsType): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(appActions.setAppStatus({status: "loading"}));

            const res = await authAPI.login(params);

            if (res.data.resultCode === 0) {
                dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
                dispatch(appActions.setAppStatus({status: "succeeded"}));
            } else {
                handleServerAppError(dispatch, res.data);
            }
        } catch (e) {
            handleServerNetworkError(dispatch, e);
        }
    };

export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: "loading"}));
    authAPI
        .logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
                dispatch(appActions.setAppStatus({status: "succeeded"}));
            } else {
                handleServerAppError(dispatch, res.data);
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error);
        });
};
