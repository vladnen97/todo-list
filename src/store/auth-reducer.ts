import { authAPI, LoginParamsType } from '../api/auth-api'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { appActions } from './app-reducer'
import { clearData } from '../common/actions/common-actions'
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError} from '../common/utils'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        },
    },
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
        })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
    }
})

//thunks
const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>('auth/login', async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
        dispatch(appActions.setAppStatus({ status: 'loading' }))

        const res = await authAPI.login(arg)

        if (res.data.resultCode === 0) {
            dispatch(appActions.setAppStatus({ status: 'succeeded' }))
            return { isLoggedIn: true }
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }
})
const logout = createAppAsyncThunk<{ isLoggedIn: boolean }>('auth/logout', async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
        dispatch(appActions.setAppStatus({ status: 'loading' }))

        const res = await authAPI.logout()

        if (res.data.resultCode === 0) {
            dispatch(appActions.setAppStatus({ status: 'succeeded' }))
            dispatch(clearData())
            return { isLoggedIn: false }
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions
export const authThunks = {login, logout}