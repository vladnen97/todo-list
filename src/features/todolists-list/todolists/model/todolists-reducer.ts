import { TodolistResponseType, todolistsAPI } from '../api/todolists-api'
import { RequestStatusType } from '../../../../app/app-reducer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { clearData } from '../../../../common/actions'
import { createAppAsyncThunk } from '../../../../common/utils'
import { thunkTryCatch } from '../../../../common/utils'
import {AxiosError} from 'axios';

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = TodolistResponseType & { filter: FilterValuesType; entityStatus: RequestStatusType }

const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodolistType>,
    reducers: {
        changeTodolistFilter: (state, action: PayloadAction<{ todolistId: string; filter: FilterValuesType }>) => {
            const todolistIndex = state.findIndex(el => el.id === action.payload.todolistId)
            state[todolistIndex].filter = action.payload.filter
        },
        changeTodolistEntityStatus: (state, action: PayloadAction<{ todolistId: string; entityStatus: RequestStatusType }>) => {
            const todolistIndex = state.findIndex(el => el.id === action.payload.todolistId)
            state[todolistIndex].entityStatus = action.payload.entityStatus
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodolists.fulfilled, (state, action) => {
                return action.payload.todolists.map(el => ({ ...el, filter: 'all', entityStatus: 'idle' }))
            })
            .addCase(createTodolist.fulfilled, (state, action) => {
                state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                const todolistIndex = state.findIndex(el => el.id === action.payload.todolistId)
                state.splice(todolistIndex, 1)
            })
            .addCase(updateTodolist.fulfilled, (state, action) => {
                const todolistIndex = state.findIndex(el => el.id === action.payload.todolistId)
                state[todolistIndex].title = action.payload.title
            })

            .addCase(clearData.type, () => {
                return []
            })
    },
})

//thunks
const fetchTodolists = createAppAsyncThunk<{todolists: Array<TodolistResponseType>}>('todolists/fetchTodolists',async (arg, thunkAPI) => {

    return thunkTryCatch(thunkAPI, async () => {
        const res = await todolistsAPI.getTodolists()
        return {todolists: res.data}
    })
})
const removeTodolist = createAppAsyncThunk<{todolistId: string}, string>('todolists/removeTodolist',async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
        dispatch(todolistsActions.changeTodolistEntityStatus({todolistId: arg, entityStatus: 'loading'}))

        const res = await todolistsAPI.deleteTodolist(arg)
        if (res.data.resultCode === 0) {
            return { todolistId: arg }
        } else {
            dispatch(todolistsActions.changeTodolistEntityStatus({todolistId: arg, entityStatus: 'failed'}))
            return rejectWithValue({data: res.data, showGlobalError: true})
        }

    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        dispatch(todolistsActions.changeTodolistEntityStatus({todolistId: arg, entityStatus: 'failed'}))
        return rejectWithValue({data: err.message})
    }
})
const createTodolist = createAppAsyncThunk<{todolist: TodolistResponseType}, string>('todolists/createTodolist', async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    return thunkTryCatch(thunkAPI, async () => {
        const res = await todolistsAPI.createTodolist(arg)
        if (res.data.resultCode === 0) {
            return {todolist: res.data.data.item}
        } else {
            return rejectWithValue({data: res.data, showGlobalError: false})
        }
    })
})
const updateTodolist = createAppAsyncThunk<{todolistId: string, title: string}, {todolistId: string, title: string}>('todolists/updateTodolist', async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    return thunkTryCatch(thunkAPI, async () => {
        const res = await todolistsAPI.updateTodolist(arg.todolistId, arg.title)
        if (res.data.resultCode === 0) {
            return { todolistId: arg.todolistId, title: arg.title }
        } else {
            return rejectWithValue({data: res.data, showGlobalError: true})
        }
    })
})

export const todolistsReducer = todolistsSlice.reducer
export const todolistsActions = todolistsSlice.actions
export const todolistsThunks = { fetchTodolists, removeTodolist, createTodolist, updateTodolist }