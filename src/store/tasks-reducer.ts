import { TaskModelType, TaskResponseType, tasksAPI } from "../api/tasks-api";
import { AppThunk } from "./store";
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";
import { appActions } from "./app-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todolistsActions } from "./todolists-reducer";

export type TasksType = {
    [key: string]: Array<TaskResponseType>;
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {} as TasksType,
    reducers: {
        setTasks: (state, action: PayloadAction<{ todolistId: string; tasks: Array<TaskResponseType> }>) => {
            state[action.payload.todolistId] = action.payload.tasks;
        },
        addTask: (state, action: PayloadAction<{ task: TaskResponseType }>) => {
            state[action.payload.task.todoListId].unshift(action.payload.task);
        },
        removeTask: (state, action: PayloadAction<{ todolistId: string; taskId: string }>) => {
            const taskIndex = state[action.payload.todolistId].findIndex((el) => el.id === action.payload.taskId);
            state[action.payload.todolistId].splice(taskIndex, 1);
        },
        updateTask: (state, action: PayloadAction<{ task: TaskResponseType }>) => {
            const taskIndex = state[action.payload.task.todoListId].findIndex((el) => el.id === action.payload.task.id);
            state[action.payload.task.todoListId].splice(taskIndex, 1, action.payload.task);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(todolistsActions.setTodolists, (state, action) => {
                action.payload.todolists.forEach((el) => (state[el.id] = []));
            })
            .addCase(todolistsActions.addTodolist, (state, action) => {
                state[action.payload.todolist.id] = [];
            })
            .addCase(todolistsActions.removeTodolist, (state, action) => {
                delete state[action.payload.todolistId];
            })
            .addCase(todolistsActions.clearData, () => {
                return {};
            });
    },
});

export const tasksReducer = tasksSlice.reducer;
export const tasksActions = tasksSlice.actions;

//thunks
export const fetchTasks =
    (todolistId: string): AppThunk =>
    (dispatch) => {
        dispatch(appActions.setAppStatus({ status: "loading" }));
        tasksAPI
            .getTasks(todolistId)
            .then((res) => {
                dispatch(tasksActions.setTasks({ todolistId, tasks: res.data.items }));
                dispatch(appActions.setAppStatus({ status: "succeeded" }));
            })
            .catch((e) => {
                handleServerNetworkError(dispatch, e);
            });
    };
export const deleteTask =
    (todolistId: string, taskId: string): AppThunk =>
    (dispatch) => {
        dispatch(appActions.setAppStatus({ status: "loading" }));

        tasksAPI
            .deleteTask(todolistId, taskId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(tasksActions.removeTask({ todolistId, taskId }));
                    dispatch(appActions.setAppStatus({ status: "succeeded" }));
                } else {
                    handleServerAppError(dispatch, res.data);
                }
            })
            .catch((err) => handleServerNetworkError(dispatch, err));
    };
export const createTask =
    (todolistId: string, title: string): AppThunk =>
    (dispatch) => {
        dispatch(appActions.setAppStatus({ status: "loading" }));

        tasksAPI
            .createTask(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(tasksActions.addTask({ task: res.data.data.item }));
                    dispatch(appActions.setAppStatus({ status: "succeeded" }));
                } else {
                    handleServerAppError(dispatch, res.data);
                }
            })
            .catch((err) => {
                handleServerNetworkError(dispatch, err);
            });
    };
export const updateTaskTC =
    (todolistId: string, taskId: string, taskModel: TaskModelType): AppThunk =>
    (dispatch, getState) => {
        dispatch(appActions.setAppStatus({ status: "loading" }));

        const task = getState().tasks[todolistId].find((el) => el.id === taskId);
        if (!task) {
            console.warn("task not found");
            return;
        }

        const model: TaskModelType = {
            title: task.title,
            status: task.status,
            priority: task.priority,
            description: task.description,
            startDate: task.startDate,
            deadline: task.deadline,
            ...taskModel,
        };

        tasksAPI
            .updateTask(todolistId, taskId, model)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(tasksActions.updateTask({ task: res.data.data.item }));
                    dispatch(appActions.setAppStatus({ status: "succeeded" }));
                } else {
                    handleServerAppError(dispatch, res.data);
                }
            })
            .catch((err) => {
                handleServerNetworkError(dispatch, err);
            });
    };
