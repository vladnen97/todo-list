import { authAPI, LoginParamsType } from '../api/auth-api'
import { createSlice } from '@reduxjs/toolkit'
import { clearData } from '../../../common/actions'
import { createAppAsyncThunk} from '../../../common/utils'
import { thunkTryCatch } from '../../../common/utils'
import {AnyAction} from 'redux';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addMatcher((action: AnyAction) => {
                return action.type === 'auth/me/fulfilled' || action.type === 'auth/login/fulfilled' || action.type === 'auth/logout/fulfilled'
            }, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
    },
})

//thunks
const me = createAppAsyncThunk<{ isLoggedIn: boolean }>('auth/me', async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    return thunkTryCatch(thunkAPI, async () => {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            return { isLoggedIn: true }
        } else {
            return rejectWithValue(null)
        }
    })
})

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>('auth/login', async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    return thunkTryCatch(thunkAPI, async () => {
        const res = await authAPI.login(arg)

        if (res.data.resultCode === 0) {
            return { isLoggedIn: true }
        } else {
            console.log(res.data)
            return rejectWithValue({data: res.data, showGlobalError: !res.data.fieldsErrors.length})
        }
    })
})
const logout = createAppAsyncThunk<{ isLoggedIn: boolean }>('auth/logout', async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    return thunkTryCatch(thunkAPI, async () => {
        const res = await authAPI.logout()

        if (res.data.resultCode === 0) {
            dispatch(clearData())
            return { isLoggedIn: false }
        } else {
            // handleServerAppError(dispatch, res.data)
            return rejectWithValue({data: res.data, showGlobalError: true})
        }
    })
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions
export const authThunks = { login, logout, me }
