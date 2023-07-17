import { appActions } from '../../../../app/app-reducer'
import { createSlice } from '@reduxjs/toolkit'
import { todolistsThunks } from '../../todolists/model/todolists-reducer'
import { clearData } from '../../../../common/actions'
import { createAppAsyncThunk } from '../../../../common/utils'
import { thunkTryCatch } from '../../../../common/utils'
import {tasksAPI} from '../api/tasks-api';
import {TaskModelType, TaskResponseType} from '../api/tasks-api-types';

export type TasksType = {
    [key: string]: Array<TaskResponseType>
}

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

            .addCase(createTask.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task)
            })

            .addCase(deleteTask.fulfilled, (state, action) => {
                const taskIndex = state[action.payload.todolistId].findIndex(el => el.id === action.payload.taskId)
                state[action.payload.todolistId].splice(taskIndex, 1)
            })

            .addCase(updateTask.fulfilled, (state, action) => {
                const taskIndex = state[action.payload.task.todoListId].findIndex(el => el.id === action.payload.task.id)
                state[action.payload.task.todoListId].splice(taskIndex, 1, action.payload.task)
            })

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

//thunks
const fetchTasks = createAppAsyncThunk<{ tasks: TaskResponseType[]; todolistId: string }, string>(
    'tasks/fetchTasks',
    async (todolistId, thunkAPI) => {

        return thunkTryCatch(thunkAPI, async () => {
            const res = await tasksAPI.getTasks(todolistId)
            return { tasks: res.data.items, todolistId }
        })
    }
)
const createTask = createAppAsyncThunk<{ task: TaskResponseType }, { todolistId: string; title: string }>(
    'tasks/addTask',
    async (arg, thunkAPI) => {
        const { rejectWithValue } = thunkAPI

        return thunkTryCatch(thunkAPI, async () => {
            const res = await tasksAPI.createTask(arg.todolistId, arg.title)
            if (res.data.resultCode === 0) {
                return { task: res.data.data.item }
            } else {
                return rejectWithValue({data: res.data, showGlobalError: false})
            }
        })
    }
)

const deleteTask = createAppAsyncThunk<{ todolistId: string; taskId: string }, { todolistId: string; taskId: string }>(
    'tasks/removeTask',
    async (arg, thunkAPI) => {
        const { rejectWithValue } = thunkAPI

        return thunkTryCatch(thunkAPI, async () => {
            const res = await tasksAPI.deleteTask(arg.todolistId, arg.taskId)
            if (res.data.resultCode === 0) {
                return { todolistId: arg.todolistId, taskId: arg.taskId }
            } else {
                return rejectWithValue({data: res.data, showGlobalError: true})
            }
        })
    }
)

const updateTask = createAppAsyncThunk<{ task: TaskResponseType }, { todolistId: string; taskId: string; taskModel: TaskModelType }>(
    'tasks/updateTask',
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue, getState } = thunkAPI

        return thunkTryCatch(thunkAPI, async () => {
            const task = getState().tasks[arg.todolistId].find(el => el.id === arg.taskId)

            if (!task) {
                dispatch(appActions.setAppError({ error: 'Task not found in this state :(' }))
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
                return { task: res.data.data.item }
            } else {
                // handleServerAppError(dispatch, res.data)
                return rejectWithValue({data: res.data, showGlobalError: true})
            }
        })

    }
)

export const tasksReducer = tasksSlice.reducer
export const tasksActions = tasksSlice.actions
export const tasksThunks = { fetchTasks, createTask, deleteTask, updateTask }
