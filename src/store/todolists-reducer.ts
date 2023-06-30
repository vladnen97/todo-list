import { TodolistResponseType, todolistsAPI } from "../api/todolists-api";
import {appActions, RequestStatusType} from './app-reducer';
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";
import { tasksThunks } from "./tasks-reducer";
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {clearData} from '../common/actions/common-actions';
import {createAppAsyncThunk} from '../utils/create-app-async-thunk';

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = TodolistResponseType & { filter: FilterValuesType; entityStatus: RequestStatusType }

const fetchTodolists = createAppAsyncThunk<{todolists: Array<TodolistResponseType>}>('todolists/fetchTodolists',async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
        dispatch(appActions.setAppStatus({status: "loading"}))

        const res = await todolistsAPI.getTodolists()

        res.data.forEach(el => {
            dispatch(tasksThunks.fetchTasks(el.id))
        })

        return {todolists: res.data}
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }
})
const removeTodolist = createAppAsyncThunk<{todolistId: string}, string>('todolists/removeTodolist',async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
        dispatch(appActions.setAppStatus({status: "loading"}))
        dispatch(todolistsActions.changeTodolistEntityStatus({todolistId: arg, entityStatus: 'loading'}))

        const res = await todolistsAPI.deleteTodolist(arg)
        if (res.data.resultCode === 0) {
            dispatch(appActions.setAppStatus({status: "succeeded"}))
            return { todolistId: arg }
        } else {
            dispatch(todolistsActions.changeTodolistEntityStatus({todolistId: arg, entityStatus: 'failed'}))
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }

    } catch (e) {
        dispatch(todolistsActions.changeTodolistEntityStatus({todolistId: arg, entityStatus: 'failed'}))
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }
})
const createTodolist = createAppAsyncThunk<{todolist: TodolistResponseType}, string>('todolists/createTodolist', async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
        dispatch(appActions.setAppStatus({status: "loading"}))

        const res = await todolistsAPI.createTodolist(arg)
        if (res.data.resultCode === 0) {
            dispatch(appActions.setAppStatus({status: "succeeded"}))
            return {todolist: res.data.data.item}
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }

    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }
})
const updateTodolist = createAppAsyncThunk<{todolistId: string, title: string}, {todolistId: string, title: string}>('todolists/updateTodolist', async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
        dispatch(appActions.setAppStatus({status: "loading"}))

        const res = await todolistsAPI.updateTodolist(arg.todolistId, arg.title)
        if (res.data.resultCode === 0) {
            dispatch(appActions.setAppStatus({ status: 'succeeded' }))
            return { todolistId: arg.todolistId, title: arg.title }
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }
})


const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodolistType>,
    reducers: {
        changeTodolistFilter: (state, action: PayloadAction<{todolistId: string, filter: FilterValuesType}>) => {
            const todolistIndex = state.findIndex(el => el.id === action.payload.todolistId)
            state[todolistIndex].filter = action.payload.filter
        },
        changeTodolistEntityStatus: (state, action: PayloadAction<{todolistId: string, entityStatus: RequestStatusType}>) => {
            const todolistIndex = state.findIndex(el => el.id === action.payload.todolistId)
            state[todolistIndex].entityStatus = action.payload.entityStatus
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodolists.fulfilled, (state, action) => {
                return action.payload.todolists.map((el) => ({ ...el, filter: "all", entityStatus: "idle" }))
            })
            .addCase(createTodolist.fulfilled, (state, action) => {
                state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                const todolistIndex = state.findIndex(el => el.id === action.payload.todolistId)
                state.splice(todolistIndex, 1)
            })
            .addCase(updateTodolist.fulfilled, (state, action) => {
                const todolistIndex = state.findIndex(el => el.id === action.payload.todolistId)
                state[todolistIndex].title = action.payload.title
            })

            .addCase(clearData.type, ()=> {
            return []
        })
    }
})

export const todolistsReducer = todolistsSlice.reducer
export const todolistsActions = todolistsSlice.actions
export const todolistsThunks = { fetchTodolists, removeTodolist, createTodolist, updateTodolist }