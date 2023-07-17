import { authThunks } from '../features/auth/model/auth-reducer'
import { createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from '../common/utils'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const appSlice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null as string | null,
        isInitialized: false,
    },
    reducers: {},
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
                (state, action) => {
                    state.status = 'failed'
                    if (action.payload) {
                        if (action.payload.showGlobalError) {
                            state.error = action.payload.data.messages[0]
                        } else {
                            if ( typeof action.payload.data === 'string') {
                                state.error = action.payload.data ? action.payload.data : 'Some error occurred'
                            }
                        }
                    }
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