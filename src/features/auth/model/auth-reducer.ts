import { authAPI, LoginParamsType } from '../api/auth-api'
import { createSlice } from '@reduxjs/toolkit'
import { clearData } from '../../../common/actions'
import { createAppAsyncThunk, handleServerAppError} from '../../../common/utils'
import { thunkTryCatch } from '../../../common/utils/thunk-try-catch'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(me.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
            .addCase(logout.fulfilled, (state, action) => {
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
    const { dispatch, rejectWithValue } = thunkAPI

    return thunkTryCatch(thunkAPI, async () => {
        const res = await authAPI.login(arg)

        if (res.data.resultCode === 0) {
            return { isLoggedIn: true }
        } else {
            handleServerAppError(dispatch, res.data, !res.data.fieldsErrors.length)
            return rejectWithValue(res.data)
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
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    })
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions
export const authThunks = { login, logout, me }
