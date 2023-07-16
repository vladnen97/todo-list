import { authThunks } from '../features/auth/model/auth-reducer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from '../common/utils'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const appSlice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null as string | null,
        isInitialized: false,
    },
    reducers: {
        setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
    },
    extraReducers: builder => {
        builder
            .addCase(initializeApp.fulfilled, (state, action) => {
                state.isInitialized = action.payload.isInitialized
            })
            .addMatcher(
                ({ type }) => {
                    return type.endsWith('/pending')
                },
                state => {
                    state.status = 'loading'
                }
            )
            .addMatcher(
                action => {
                    return action.type.endsWith('/fulfilled')
                },
                state => {
                    state.status = 'succeeded'
                }
            )
            .addMatcher(
                action => {
                    return action.type.endsWith('/rejected')
                },
                (state) => {
                    state.status = 'failed'
                }
            )
    },
})

//thunks
const initializeApp = createAppAsyncThunk<{ isInitialized: boolean }>('app/initializeApp', async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI

    await dispatch(authThunks.me())
    return { isInitialized: true }
})

export const appReducer = appSlice.reducer
export const appActions = appSlice.actions
export const appThunks = { initializeApp }