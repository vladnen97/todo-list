import { TaskModelType, TaskResponseType, tasksAPI } from '../api/tasks-api'
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils'
import { appActions } from './app-reducer'
import { createSlice } from '@reduxjs/toolkit'
import { todolistsThunks } from './todolists-reducer'
import { clearData } from '../common/actions/common-actions'
import { createAppAsyncThunk } from '../utils/create-app-async-thunk'

export type TasksType = {
    [key: string]: Array<TaskResponseType>
}

//thunks
const fetchTasks = createAppAsyncThunk<{ tasks: TaskResponseType[]; todolistId: string }, string>(
    'tasks/fetchTasks',
    async (todolistId, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        try {
            dispatch(appActions.setAppStatus({ status: 'loading' }))
            const res = await tasksAPI.getTasks(todolistId)
            dispatch(appActions.setAppStatus({ status: 'succeeded' }))
            return { tasks: res.data.items, todolistId }
        } catch (e) {
            handleServerNetworkError(dispatch, e)
            return rejectWithValue(null)
        }
    }
)
const createTask = createAppAsyncThunk<{ task: TaskResponseType }, { todolistId: string; title: string }>(
    'tasks/addTask',
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI

        try {
            dispatch(appActions.setAppStatus({ status: 'loading' }))
            const res = await tasksAPI.createTask(arg.todolistId, arg.title)
            if (res.data.resultCode === 0) {
                dispatch(appActions.setAppStatus({ status: 'succeeded' }))
                return { task: res.data.data.item }
            } else {
                handleServerAppError(dispatch, res.data)
                return rejectWithValue(null)
            }
        } catch (e) {
            handleServerNetworkError(dispatch, e)
            return rejectWithValue(null)
        }
    }
)

const deleteTask = createAppAsyncThunk<{ todolistId: string; taskId: string }, { todolistId: string; taskId: string }>(
    'tasks/removeTask',
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI
        try {
            dispatch(appActions.setAppStatus({ status: 'loading' }))
            const res = await tasksAPI.deleteTask(arg.todolistId, arg.taskId)
            if (res.data.resultCode === 0) {
                dispatch(appActions.setAppStatus({ status: 'succeeded' }))
                return {todolistId: arg.todolistId, taskId: arg.taskId}
            } else {
                handleServerAppError(dispatch, res.data)
                return rejectWithValue(null)
            }
        } catch (e) {
            handleServerNetworkError(dispatch, e)
            return rejectWithValue(null)
        }
    }
)

const updateTask = createAppAsyncThunk<{task: TaskResponseType}, {todolistId: string, taskId: string, taskModel: TaskModelType}>('tasks/updateTask',async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI
    try {
        dispatch(appActions.setAppStatus({ status: 'loading' }))
        const task = getState().tasks[arg.todolistId].find(el => el.id === arg.taskId)

        if (!task) {
            console.warn('task not found')
            return rejectWithValue(null)
        }

        const model: TaskModelType = {
            title: task.title,
            status: task.status,
            priority: task.priority,
            description: task.description,
            startDate: task.startDate,
            deadline: task.deadline,
            ...arg.taskModel,
        }

        const res = await tasksAPI.updateTask(arg.todolistId, arg.taskId, model)
        if (res.data.resultCode === 0) {
            dispatch(appActions.setAppStatus({ status: 'succeeded' }))
            return { task: res.data.data.item }
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }
})

//slice
const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {} as TasksType,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(fetchTasks.rejected, (state, action) => {})

            .addCase(createTask.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task)
            })
            .addCase(createTask.rejected, (state, action) => {})

            .addCase(deleteTask.fulfilled, (state, action) => {
                const taskIndex = state[action.payload.todolistId].findIndex(el => el.id === action.payload.taskId)
                state[action.payload.todolistId].splice(taskIndex, 1)
            })
            .addCase(deleteTask.rejected, (state, action) => {})

            .addCase(updateTask.fulfilled, (state, action) => {
                const taskIndex = state[action.payload.task.todoListId].findIndex(el => el.id === action.payload.task.id)
                state[action.payload.task.todoListId].splice(taskIndex, 1, action.payload.task)
            })
            .addCase(updateTask.rejected, (state, action) => {})

            .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
                action.payload.todolists.forEach(el => (state[el.id] = []))
            })
            .addCase(todolistsThunks.createTodolist.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
                delete state[action.payload.todolistId]
            })
            .addCase(clearData.type, () => {
                return {}
            })
    },
})

export const tasksReducer = tasksSlice.reducer
export const tasksActions = tasksSlice.actions
export const tasksThunks = { fetchTasks, createTask, deleteTask, updateTask }