import { authAPI } from "../api/auth-api";
import { authActions } from "./auth-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError} from '../common/utils';

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
    },
    extraReducers: builder => {
        builder
            .addCase(initializeApp.fulfilled, (state, action) => {
                state.isInitialized = action.payload.isInitialized
            })
    }
})

//thunks
const initializeApp = createAppAsyncThunk<{ isInitialized: boolean }>('app/initializeApp', async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
        } else {
            handleServerAppError(dispatch, res.data)
        }
        return { isInitialized: true }

    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }
})

export const appReducer = appSlice.reducer;
export const appActions = appSlice.actions;
export const appThunks = { initializeApp }