import { TodolistResponseType, todolistsAPI } from "../api/todolists-api";
import { AppThunk } from "./store";
import {appActions, RequestStatusType} from './app-reducer';
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";
import { AxiosError } from "axios";
import { tasksThunks } from "./tasks-reducer";
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {clearData} from '../common/actions/common-actions';

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = TodolistResponseType & { filter: FilterValuesType; entityStatus: RequestStatusType };

const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodolistType>,
    reducers: {
        setTodolists: (state, action: PayloadAction<{todolists: Array<TodolistResponseType>}>) => {
            return action.payload.todolists.map((el) => ({ ...el, filter: "all", entityStatus: "idle" }))
        },
        addTodolist: (state, action: PayloadAction<{todolist: TodolistResponseType}>) => {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
        },
        removeTodolist: (state, action: PayloadAction<{todolistId: string}>) => {
            const todolistIndex = state.findIndex(el => el.id === action.payload.todolistId)
            state.splice(todolistIndex, 1)
        },
        changeTodolistTitle: (state, action: PayloadAction<{todolistId: string, title: string}>) => {
            const todolistIndex = state.findIndex(el => el.id === action.payload.todolistId)
            state[todolistIndex].title = action.payload.title
        },
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
        builder.addCase(clearData.type, ()=> {
            return []
        })
    }
})

export const todolistsReducer = todolistsSlice.reducer
export const todolistsActions = todolistsSlice.actions

//thunk creators
export const fetchTodolists = (): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: "loading"}));
    todolistsAPI
        .getTodolists()
        .then((res) => {
            dispatch(todolistsActions.setTodolists({todolists: res.data}));
            return res.data;
        })
        .then((todos) => {
            todos.forEach((el) => {
                dispatch(tasksThunks.fetchTasks(el.id));
            });
        })
        .catch((e: AxiosError) => {
            handleServerNetworkError(dispatch, e);
        });
};
export const removeTodolistTC =
    (todolistId: string): AppThunk =>
    (dispatch) => {
        dispatch(appActions.setAppStatus({status: "loading"}));
        dispatch(todolistsActions.changeTodolistEntityStatus({todolistId, entityStatus: 'loading'}));
        todolistsAPI
            .deleteTodolist(todolistId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(todolistsActions.removeTodolist({ todolistId }));
                    dispatch(appActions.setAppStatus({status: "succeeded"}));
                } else {
                    handleServerAppError(dispatch, res.data);
                    dispatch(todolistsActions.changeTodolistEntityStatus({todolistId, entityStatus: 'failed'}));

                }
            })
            .catch((e: AxiosError) => {
                handleServerNetworkError(dispatch, e);
                dispatch(todolistsActions.changeTodolistEntityStatus({todolistId, entityStatus: 'failed'}));
            });
    };
export const createTodolistTC =
    (title: string): AppThunk =>
    (dispatch) => {
        dispatch(appActions.setAppStatus({status: "loading"}));
        todolistsAPI
            .createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(todolistsActions.addTodolist({todolist: res.data.data.item}));
                    dispatch(appActions.setAppStatus({status: "succeeded"}));
                } else {
                    handleServerAppError(dispatch, res.data);
                }
            })
            .catch((e: AxiosError) => {
                handleServerNetworkError(dispatch, e);
            });
    };
export const updateTodolistTC =
    (todolistId: string, title: string): AppThunk =>
    (dispatch) => {
        dispatch(appActions.setAppStatus({status: "loading"}));

        todolistsAPI
            .updateTodolist(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(todolistsActions.changeTodolistTitle({ todolistId, title }));
                    dispatch(appActions.setAppStatus({status: "succeeded"}));
                } else handleServerAppError(dispatch, res.data);
            })
            .catch((e: AxiosError) => handleServerNetworkError(dispatch, e));
    };
