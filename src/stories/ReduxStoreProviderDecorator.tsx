import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { v1 } from "uuid";
import { RootStateType } from "../app/store";
import { tasksReducer } from "../features/todolists-list/tasks/model/tasks-reducer";
import { todolistsReducer } from "../features/todolists-list/todolists/model/todolists-reducer";
import { appReducer } from "../app/app-reducer";
import thunk from "redux-thunk";
import { authReducer } from "../features/auth/model/auth-reducer";
import {TaskStatuses} from '../features/todolists-list/tasks/api/tasks-api-types';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
});

const initialGlobalState = {
    todolists: [
        { id: "todolistId1", title: "What to learn", filter: "all", order: 0, addedDate: "", entityStatus: "idle" },
        { id: "todolistId2", title: "What to buy", filter: "all", order: 0, addedDate: "", entityStatus: "idle" },
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: "",
                priority: 0,
                description: "",
                order: 0,
                addedDate: "",
                deadline: "",
            },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: "",
                priority: 0,
                description: "",
                order: 0,
                addedDate: "",
                deadline: "",
            },
        ],
        ["todolistId2"]: [
            {
                id: v1(),
                title: "Milk",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: "",
                priority: 0,
                description: "",
                order: 0,
                addedDate: "",
                deadline: "",
            },
            {
                id: v1(),
                title: "React Book",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: "",
                priority: 0,
                description: "",
                order: 0,
                addedDate: "",
                deadline: "",
            },
        ],
    },
    app: {
        status: "idle",
        error: null,
        isInitialized: false,
    },
    auth: {
        isLoggedIn: true,
    },
};

export const storyBookStore = legacy_createStore(
    rootReducer,
    initialGlobalState as RootStateType,
    applyMiddleware(thunk)
);

export const ReduxStoreProviderDecorator = (storyFn: any) => <Provider store={storyBookStore}>{storyFn()}</Provider>;
