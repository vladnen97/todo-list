import { authAPI } from "../api/auth-api";
import { AppThunk } from "./store";
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";
import { authActions } from "./auth-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const appSlice = createSlice({
    name: "app",
    initialState: {
        status: "idle" as RequestStatusType,
        error: null as string | null,
        isInitialized: false,
    },
    reducers: {
        setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status;
        },
        setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error;
        },
        setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized;
        },
    },
});

export const appReducer = appSlice.reducer;
export const appActions = appSlice.actions;

//thunk

export const initializeAppTC = (): AppThunk => (dispatch) => {
    authAPI
        .me()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
            } else {
                handleServerAppError(dispatch, res.data);
            }
        })
        .catch((e) => {
            handleServerNetworkError(dispatch, e);
        })
        .finally(() => {
            dispatch(appActions.setIsInitialized({ isInitialized: true }));
        });
};
